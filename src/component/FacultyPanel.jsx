import React from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyPanel = () => {
  const Navigate = useNavigate();

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      
      alignItems: 'center',
      backgroundImage:
        'url("https://www.itcilo.org/sites/default/files/courses/cover-images/A9717016.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    heading: {
      color: '#333',
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    button: {
      margin: '10px',
      padding: '10px 20px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    
    <div style={styles.container}>
      <h2 style={styles.heading}>Faculty Panel</h2>

      <button
        style={styles.button}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = styles.button.backgroundColor)
        }
        onClick={() => Navigate('/CoursePlanList')}
      >
        View Course Plan
      </button>

      <button
        style={styles.button}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = styles.button.backgroundColor)
        }
        onClick={() => Navigate('/DayWisePlan')}
      >
        Update DayWise Plans
      </button>

      <button
        style={styles.button}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = styles.button.backgroundColor)
        }
        onClick={() => Navigate('/UpdateFaculty')}
      >
        Update Details
      </button>
    </div>
  );
};

export default FacultyPanel;
