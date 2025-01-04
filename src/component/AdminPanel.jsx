import React from 'react';
import { useNavigate } from 'react-router-dom';


const AdminPanel = () => {
  const navigate = useNavigate();

  // Define styles as objects
  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage:
        'url("https://www.itcilo.org/sites/default/files/courses/cover-images/A9717016.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    panel: {
      textAlign: 'center',
      // backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      border: '1px solid black',
      width:'200px',
    },
    heading: {
      fontSize: '15px',
      color: '#333',
      marginBottom: '20px',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '10px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <>
      
      <div style={styles.container}>
        <div style={styles.panel}>
          <h2 style={styles.heading}>Admin Panel</h2>
          <div style={styles.buttonContainer}>
            <button
              onClick={() => navigate('/CoursePlanList')}
              style={styles.button}
            >
              View CoursePlanList
            </button>
            <button
              onClick={() => navigate('/FacultyList')}
              style={styles.button}
            >
              View Faculty Details
            </button>
            <button
              onClick={() => navigate('/BatchList')}
              style={styles.button}
            >
              View Batch Details
            </button>
            <button
              onClick={() => navigate('/ListCourse')}
              style={styles.button}
            >
              View Course Details
            </button>
            <button
              onClick={() => navigate('/AddCourse')}
              style={styles.button}
            >
              Add Course
            </button>
            <button
              onClick={() => navigate('/AddBatch')}
              style={styles.button}
            >
              Add Batch
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
