import React from "react";
import Header from "./Header";


function Home() {
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
      color: '#fff', // White text color for contrast
    }}>
      <Header logout={true} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 60px)', // Adjust based on Header height
        width: '100%',
        padding: '0 20px',
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.6',
            margin: '0',
            fontWeight: '300'
          }}>
            Discover our cutting-edge AI tool designed to streamline development processes and enhance productivity. Embrace the future of coding with intuitive features and seamless integration, all tailored to support and elevate your projects.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;