const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const userModels = require('./mongodb');
const app = express();
const port = 3001;

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




//Home
app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});


//Register
app.post('/Register', async (req, res) => {
  try {
    const { fname, lname, username, mail, password, role } = req.body;

    if (!fname || !lname || !username || !mail || !password || !role) {
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

    const UserModel = userModels[role];
    if (!UserModel) {
      console.log(UserModel)
      return res.status(400).json({ message: "Invalid role specified" });
    }

    UserModel.register({ fname, lname, username, mail, role }, password, (err, newUser) => {
      if (err || !newUser) {
        console.log(err || "Registration failed");
        return res.status(500).json({ message: "Registration failed" });
      }

      req.login(newUser, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Registration failed" });
        }
        return res.status(200).json({ message: "Registration successful", user: newUser });
      });
    });

  } catch (err) {
    console.log(err);
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


//Login
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




//Change password
app.post('/ChangePassword', async (req, res) => {
  try {
    const { username, currentPassword, newPassword, role } = req.body;

    if (!username || !currentPassword || !newPassword || !role) {
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
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  }
  res.json({ user: null });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});




