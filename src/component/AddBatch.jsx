import React, { useState } from 'react';

const API_URL = 'http://localhost:8080/api/batch/create';

function AddBatch({ onBatchAdded }) {
  const [batchData, setBatchData] = useState({
    courseId: '',
    facultyId: '',
    noOfstudents: '',
    date: '',
    duration: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBatchData({ ...batchData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchData),
      });

      if (response.ok) {
        alert('Batch added successfully!');
        onBatchAdded(); // Callback to refresh the batch list
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add the batch.');
      }
    } catch (err) {
      setError('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };


  const styles = {
    background: {
      backgroundImage: 'url("https://www.itcilo.org/sites/default/files/courses/cover-images/A9717016.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',

    },
    container: {
      maxWidth: '300px',
      
      margin: '0 auto',
      padding: '20px',
      fontSize:'10px',
      border: '1px solid black',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    form: {
     
      fontSize:'10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '10px',
      fontSize: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    button: {
      padding: '10px',
      fontSize: '10px',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.background}>
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Batch</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="number"
          name="courseId"
          placeholder="Course ID"
          value={batchData.courseId}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="facultyId"
          placeholder="Faculty ID"
          value={batchData.facultyId}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="noOfstudents"
          placeholder="Number of Students"
          value={batchData.noOfstudents}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="date"
          name="date"
          value={batchData.date}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (days)"
          value={batchData.duration}
          onChange={handleInputChange}
          required
          style={styles.input}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ ...styles.button, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Adding...' : 'Add Batch'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
      </div>
      </div>
  );
}

export default AddBatch;
