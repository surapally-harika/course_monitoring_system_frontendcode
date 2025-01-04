import React, { useState } from 'react';

function UpdateFaculty() {
  const [facultyData, setFacultyData] = useState({
    id: '',
    facultyname: '',
    mobile: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyData({
      ...facultyData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    

    // Update the faculty details
    fetch(`http://localhost:8080/api/faculty/update/${facultyData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        facultyname: facultyData.facultyname,
        mobile: facultyData.mobile,
        email: facultyData.email,
        password: facultyData.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update faculty details.');
        }
        return response.json();
      })
      .then((data) => {
        setSuccess('Faculty details updated successfully!');
        setFacultyData({
          id: '',
          facultyname: '',
          mobile: '',
          email: '',
          password: '',
        });
      })
      .catch((err) => {
        setError('Error updating faculty details: ' + err.message);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Update Faculty Details by ID</h1>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Faculty ID:</label>
          <input
            type="text"
            name="id"
            value={facultyData.id}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Faculty Name:</label>
          <input
            type="text"
            name="facultyname"
            value={facultyData.facultyname}
            onChange={handleChange}
            style={styles.input}
            // required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={facultyData.mobile}
            onChange={handleChange}
            style={styles.input}
            // required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={facultyData.email}
            onChange={handleChange}
            style={styles.input}
            // required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={facultyData.password}
            onChange={handleChange}
            style={styles.input}
            // required
          />
        </div>

        <button type="submit" style={styles.button}>
          Update Faculty
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  },
  inputFocus: {
    borderColor: '#007BFF',
    outline: 'none',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '10px',
  },
  success: {
    color: 'green',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default UpdateFaculty;
