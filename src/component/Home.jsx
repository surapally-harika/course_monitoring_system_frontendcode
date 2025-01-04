import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/Admin'); // Adjust this route to your actual Admin Login page
  };

  const handleFacultyLogin = () => {
    navigate('/Faculty'); // Adjust this route to your actual Faculty Login page
  };

  const styles = {
    background:{
         width: '100%',
    height: '100vh',
    backgroundImage: 'url(https://www.itcilo.org/sites/default/files/courses/cover-images/A9717016.jpeg)', // Your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      
      // backgroundColor: '#007BFF',
      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Transparent black with 30% opacity
    color: 'black', // Text color
    padding: '10px 20px', // Padding around the navbar
    position: 'fixed', // Fix navbar at the top
    top: '0',
    left: '0',
    right: '0',
    zIndex: 1000,
     
      
    },
    navbarTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    navbarLinks: {
      display: 'flex',
      gap: '20px',
    },
    navbarLink: {
      cursor: 'pointer',
      fontSize: '18px',
      color: 'black',
      textDecoration: 'none',
      padding: '5px 10px',
    },
    container: {
      padding:'30px',
      textAlign: 'center',
      marginTop: '60px',
      color:'black',
    },
    button: {
      margin: '20px',
      padding: '10px 20px',
      backgroundColor: 'gray',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '18px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.background}>
      
      <nav style={styles.navbar}>
        <div style={styles.navbarTitle}>Course Monitoring System</div>
        <div style={styles.navbarLinks}>
          <a style={styles.navbarLink} onClick={handleAdminLogin}>
            Admin 
          </a>
          <a style={styles.navbarLink} onClick={handleFacultyLogin}>
            Faculty 
          </a>
        </div>
      </nav>
      <div style={styles.container}>
        <h1>Welcome to the Course Monitoring System</h1>
        <p>Please select your role to proceed:</p>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={handleAdminLogin}
        >
          Admin 
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={handleFacultyLogin}
        >
          Faculty 
        </button>
      </div>
    </div>
  );
};

export default HomePage;
