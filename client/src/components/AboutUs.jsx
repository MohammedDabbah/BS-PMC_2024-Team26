import React from 'react';

const AboutUs = () => {
  return (
    <div style={{
      backgroundImage: 'url(https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        borderRadius: '6px',
        padding: '15px',  
        maxWidth: '700px', 
        color: '#fff', 
        marginBottom: '20px',  
      }}>
        <h1>About Us</h1>
        <p>Welcome to our website! We are a team of passionate developers dedicated to creating amazing web experiences. Meet our team:</p>
        
        <div style={{ marginTop: '15px' }}>
          <h2>Mohammed Dabbah</h2>
          <p>Dabbah is a backend developer with strong expertise in Node.js. He focuses on building efficient server-side systems and managing databases like MongoDB. In our project, Dabbah handles backend issues, ensuring seamless communication between the server and the frontend.</p>
        </div>
        
        <div style={{ marginTop: '15px' }}>
          <h2>Hosni Garra</h2>
          <p>Hosni is a full-stack developer skilled in React and Node.js. He excels at creating responsive interfaces and integrating them with the backend using Axios. Hosni ensures our application is user-friendly and that data flows smoothly between the frontend and backend.</p>
        </div>
        
        <div style={{ marginTop: '15px' }}>
          <h2>Rasheed Abu Ammar</h2>
          <p>Rasheed is our backend specialist, particularly experienced with Node.js and MongoDB. He optimizes server performance and manages data effectively. Rasheed plays a key role in maintaining the stability and efficiency of our project's backend.</p>
        </div>
        
        <div style={{ marginTop: '15px' }}>
          <h2>Mohamad Daqa</h2>
          <p>Daqa is a frontend developer with a knack for React. He focuses on building intuitive, user-friendly interfaces that connect seamlessly with the backend. Daqa's work ensures our project looks great and functions smoothly across all devices.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
