const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const userModels = require('./mongodb');
const { generateFourDigitCode, sendEmail } = require('./mail');
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ChatHistory = require('./chatHistory');
const fs = require('fs');


const app = express();
const router = express.Router();
const port = 3001;
const verificationCodes = {};


// const AI_API_KEY = 'f20b25eca0c841748d045c9695870a32';
// const genAI = new GoogleGenerativeAI('AIzaSyDaoqMCMzg5tfrTIlxQSO4kCqi2biKqis8');
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const API_KEY = 'AIzaSyDaoqMCMzg5tfrTIlxQSO4kCqi2biKqis8'; // Replace with your actual Gemini API key

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true, // Enable credentials (cookies)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(session({
  secret: "this our little secret.",
  resave: false,
  saveUninitialized: false,
  cookie: { domain: "localhost", secure: false },
  credentials: true,
}));

app.use(passport.initialize());
app.use(passport.session());

Object.entries(userModels).forEach(([role, model]) => {
  passport.use(role, model.createStrategy());
});
passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, {
      id: user.id,
      username: user.username,
      fname: user.fname,
      lname: user.lname,
      role: user.role,
      mail: user.mail,
      msg:user.msg,
      userInput: [],
      chatRes: [],
    });
  });
});

passport.deserializeUser(async (user, cb) => {
  const Model = userModels[user.role];
  if (!Model) return cb(new Error('No user role specified'));

  try {
    const userRecord = await Model.findById(user.id);
    cb(null, userRecord);
  } catch (err) {
    cb(err);
  }
});

// Home
app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

app.get('/Verification', async (req, res) => {
  try {
    const { mail } = req.query;

    if (!mail) {
      return res.status(400).json({ message: "Email is required" });
    }

    const code = generateFourDigitCode();
    verificationCodes[mail] = code;
    console.log(`Generated code for ${mail}: ${code}`);

    await sendEmail(mail, 'Email Verification', `Your verification code: ${code}`);
    res.status(200).send('Verification email sent');
  } catch (err) {
    console.error('Error in /Verification route:', err);
    res.status(500).send('Failed to send verification email');
  }
});

// Register
app.post('/Register', async (req, res) => {
  try {
    const { fname, lname, username, mail, password, role, code } = req.body;

    if (!fname || !lname || !username || !mail || !password || !role || !code) {
      return res.status(406).json({ message: "Please fill all the details" });
    }
    if (!isValidEmail(mail)) {
      return res.status(406).json({ message: "Please enter a valid email address" });
    }

    const existingUser = await findUserByUsername(username);
    const existingEmail = await findUserByEmail(mail);

    if (existingEmail) {
      return res.status(406).json({ message: "Email address is already in use" });
    }
    if (existingUser) {
      return res.status(406).json({ message: "Username is already taken" });
    }
    console.log(verificationCodes[mail], ' code:', code)
    if (`${verificationCodes[mail]}` !== code) {
      return res.status(406).json({ message: "Please enter a valid code" });
    }

    // Clear the used code
    delete verificationCodes[mail];

    const UserModel = userModels[role];
    if (!UserModel) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    UserModel.register({ fname, lname, username, mail, role }, password, (err, newUser) => {
      if (err || !newUser) {
        console.error('Error in registration:', err);
        return res.status(500).json({ message: "Registration failed" });
      }

      req.login(newUser, (err) => {
        if (err) {
          console.error('Error logging in after registration:', err);
          return res.status(500).json({ message: "Registration failed" });
        }
        return res.status(200).json({ message: "Registration successful", user: newUser });
      });
    });

  } catch (err) {
    console.error('Error in /Register route:', err);
    return res.status(500).json({ message: "Registration failed" });
  }
});

async function findUserByUsername(username) {
  return Promise.any(Object.values(userModels).map(model => model.findOne({ username })));
}

async function findUserByEmail(mail) {
  return Promise.any(Object.values(userModels).map(model => model.findOne({ mail })));
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

// Login
app.post('/login', (req, res, next) => {
  const { username, password, role } = req.body;
  const UserModel = userModels[role];

  if (!UserModel) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  passport.authenticate(role, (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).json({ message: 'An error occurred during authentication' });
    }
    if (!user) {
      console.warn('Authentication failed:', info ? info.message : 'Unknown reason');
      return res.status(401).json({ message: 'Username or Password is Incorrect' });
    }
    req.login(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Login failed' });
      }
      return res.json({ user });
    });
  })(req, res, next);
});


// Change password
app.post('/ChangePassword', async (req, res) => {
  try {
    const {currentPassword, newPassword, confirmNewPassword} = req.body;

    console.log(req.body);

    if (!currentPassword || !newPassword) {
      return res.status(406).json({ message: "Please fill all the details" });
    }

    if(newPassword!==confirmNewPassword){
      return res.status(406).json({ message: "Passwords does not match" });
    }

    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const UserModel = userModels[req.user.role];
    if (!UserModel) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const existingUser = await UserModel.findOne({username:req.user.username});

    if (!existingUser) {
      return res.status(406).json({ message: "Username not found" });
    }

    existingUser.authenticate(currentPassword, async (err, authenticatedUser) => {
      if (err || !authenticatedUser) {
        return res.status(406).json({ message: "Incorrect current password" });
      }

      authenticatedUser.setPassword(newPassword, async (err) => {
        if (err) {
          return res.status(500).json("Error setting new password");
        }
        await authenticatedUser.save();
        return res.json("Password changed successfully");
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Failed to change password");
  }
});

// Forgot password
app.post('/ForgotPassword', async (req, res) => {
  try {
    const { username, mail, code, role, password } = req.body;

    if (!username || !password || !mail || !role || !code) {
      return res.status(406).json({ message: "Please fill all the details" });
    }

    const UserModel = userModels[role];
    if (!UserModel) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const existingUser = await UserModel.findOne({ username });

    if (!existingUser) {
      return res.status(406).json({ message: "Username not found" });
    }
    if (!verificationCodes[mail] || `${verificationCodes[mail]}` !== code) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    // Remove the used verification code
    delete verificationCodes[mail];

    existingUser.setPassword(password, async (err) => {
      if (err) {
        return res.status(500).json("Error setting new password");
      }
      await existingUser.save();
      return res.json("Password changed successfully");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Failed to change password");
  }
});

app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to destroy session' });
      }
      res.clearCookie('connect.sid', { path: '/' });
      return res.status(200).json({ message: 'Logout successful' });
    });
  });
});

// Add this endpoint to check authentication status
app.get('/authenticated', (req, res) => {
  console.log(req.user);
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log('test-auth');
    return res.json({ user: req.user });
  }
  res.json({ user: null });
});

app.get('/profile', (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

// Add OpenAI endpoint
app.post('/api/completions', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }
  try {
    const response = await axios.post(
      `https://api.aimlapi.com/chat/completions`,
      {
        model: 'gpt-3.5-turbo-0301', // Use the appropriate model
        messages: [{ role: 'user', content: prompt }],
        "max_tokens": 512,
        "stream": false,
      },
      {
        headers: {
          'Authorization': `Bearer f20b25eca0c841748d045c9695870a32`, // Replace with your actual OAuth 2.0 Bearer token
          'Content-Type': 'application/json',
        },
      }
    );

    // Adjust based on the actual API response structure
    res.json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 429) {
      res.status(429).json({ message: 'Quota exceeded. Please check your plan and billing details.' });
    } else {
      res.status(error.response ? error.response.status : 500).json({ message: 'An error occurred while communicating with the AI API' });
    }
  }
});



app.get('/developers', async (req, res) => {
  try {

    const developers = await userModels.developer.find();
    res.json(developers);
  } catch (err) {
    console.error('Error fetching developers:', err);
    res.status(500).json({ message: 'Failed to fetch developers' });
  }
});

app.get('/testers', async (req, res) => {
  try {
    const testers = await userModels.tester.find();
    res.json(testers);
  } catch (err) {
    console.error('Error fetching testers:', err);
    res.status(500).json({ message: 'Failed to fetch testers' });
  }
});

app.post('/updates', async (req, res) => {
  try {
    const { data, sign, fname, lname, code, email } = req.body;
    console.log(sign)
    const UserModel = userModels[data.role];

    if (!UserModel) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const us = data.username;
    const existingUser = await UserModel.findOne({ username: us });

    if (!existingUser) {
      return res.status(406).json({ message: "Username not found" });
    }

    if (sign === "nameEdit") {
      existingUser.fname = fname;
      existingUser.lname = lname;
      await existingUser.save(); // Make sure to await the save operation
      return res.status(200).json({ message: "Name updated successfully" });

    } else if (sign === "emailEdit") {
      if (!verificationCodes[email] || `${verificationCodes[email]}` !== code) {
        return res.status(400).json({ message: "Invalid or expired verification code" });
      }
      existingUser.mail = email;
      await existingUser.save(); // Make sure to await the save operation

      // Remove the used verification code
      delete verificationCodes[email];

      return res.status(200).json({ message: "Email updated successfully" });

    } else {
      return res.status(400).json({ message: "Invalid update type specified" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});



app.post('/send-feedback', async (req, res) => {
  const { feedback } = req.body;

  try {
    await sendEmail('hosni.1gh@gmail.com', 'Feedback', feedback);
    res.status(200).send({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    res.status(500).send({ message: 'Failed to send feedback' });
  }

});



// Add Gemini AI API interaction
// app.post('/api/completions', async (req, res) => {
//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({ message: 'Prompt is required' });
//   }
//   try {
//     const chat = model.startChat({
//       history: [
//         {
//           role: "user",
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     const result = await chat.sendMessage(prompt);
//     console.log(result.response.text());
//     res.json({ response: await result.response.text() });
//   } catch (error) {
//     console.error("Error making API request:", error);
//     res.status(500).json({ error: "An error occurred." });
//   }
// });

//messages

//sending a message
app.post('/send-message', async (req, res) => {
  if (req.isAuthenticated()) {
    const { recipientUsername, recipientRole, subject, body, done } = req.body;
    const senderUsername = req.user.username;
    const senderRole = req.user.role;

    try {
      // Check if the recipient role is valid
      if (!userModels[recipientRole]) {
        return res.status(400).json({ message: "Invalid recipient role" });
      }

      // Fetch the recipient
      const recipient = await userModels[recipientRole].findOne({ username: recipientUsername });
      if (!recipient) {
        return res.status(404).json({ message: "Recipient not found" });
      }

      // Check if the recipient is in the sender's collab array
      const isCollab = req.user.collab.some(collab =>
        collab.username === recipientUsername && collab.role === recipientRole
      );

      if (!isCollab) {
        return res.status(403).json({ message: "You can only send messages to users in your collaboration list" });
      }

      // Append the new message to recipient's messages array
      recipient.messages.push({
        senderUsername,
        senderRole,
        subject,
        body,
        done,
        dateSent: new Date(), // Optional: Store the timestamp of the message
      });

      await recipient.save();

      return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({ message: 'Failed to send message' });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});


app.get('/messages', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // Assuming req.user.messages is an array of message objects
      res.status(200).json(req.user.messages);
    } else {
      res.status(401).json({ message: 'User is not authenticated' });
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/update-message-status',async (req,res)=>{
  try{
    const {index}=req.query;
    const messageIndex =parseInt(index, 10);
    if (isNaN(messageIndex) || messageIndex < 0) {
      return res.status(400).json({ message: "Invalid message index" });
    }
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const UserModel = userModels[req.user.role];
    const user = await UserModel.findOne({ username: req.user.username });

    // Ensure messages array exists and index is within bounds
    if (!user || !user.messages || !user.messages[messageIndex]) {
      return res.status(404).json({ message: "Message not found" });
    }
    const obj= user.messages[messageIndex];
    obj.done=true;
    user.messages[messageIndex] = obj;
    await user.save();
    return res.status(200).json({ message: "Message status updated successfully" });
  } catch (error) {
    console.error('Error updating message status:', error);
    return res.status(500).json({ message: 'Failed to update message status' });
  }
});



app.delete('/messages-delete', async (req, res) => {
  try {
    const { index } = req.query;
    const messageIndex = parseInt(index, 10);
    if (isNaN(messageIndex) || messageIndex < 0) {
      return res.status(400).json({ message: "Invalid message index" });
    }
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const UserModel = userModels[req.user.role];
    const user = await UserModel.findOne({ username: req.user.username });

    if (!user || !user.messages || !user.messages[messageIndex]) {
      return res.status(404).json({ message: "Message not found" });
    }
    const arr=user.messages;
    arr.splice(messageIndex,1);
    user.messages=arr; // Remove the message
    await user.save();

    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error('Error deleting message:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/adding-collab', async (req, res) => {
  const { collabUsername, collabRole } = req.body;

  // Check if all details are provided
  if (!collabUsername || !collabRole) {
    return res.status(406).json({ message: "Please fill all the details" });
  }

  try {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const UserModel = userModels[collabRole];
    const user = await UserModel.findOne({ username: collabUsername });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the collaboration already exists
    const collaborationExists = req.user.collab.some(collab =>
      collab.username === collabUsername && collab.role === collabRole
    );

    if (collaborationExists) {
      return res.status(409).json({ message: "Collaboration already exists" });
    }

    // Add the new collaboration
    req.user.collab.push({
      fname: user.fname,
      lname: user.lname,
      username: collabUsername,
      role: collabRole,
      mail: user.mail
    });
    await req.user.save();

    // Send success response
    return res.status(200).json({ message: "Collaboration added successfully" });
  } catch (err) {
    console.error('Error adding collaboration:', err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get('/get-collaborations', async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the authenticated user
    const UserModel = userModels[req.user.role];
    const user = await UserModel.findById(req.user._id).populate('collab.username');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's collaborations
    return res.status(200).json({ collaborations: user.collab });
  } catch (err) {
    console.error('Error fetching collaborations:', err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete('/collab-delete',async(req,res)=>{
  try {
    const { index } = req.query;
    const collabIndex = parseInt(index, 10);
    if (isNaN(collabIndex) || collabIndex < 0) {
      return res.status(400).json({ message: "Invalid message index" });
    }
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const UserModel = userModels[req.user.role];
    const user = await UserModel.findOne({ username: req.user.username });

    if (!user || !user.messages || !user.messages[collabIndex]) {
      return res.status(404).json({ message: "Message not found" });
    }
    const arr=user.collab;
    arr.splice(collabIndex,1);
    user.collab=arr; // Remove the message
    await user.save();

    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error('Error deleting message:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
