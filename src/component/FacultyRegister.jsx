import React, { useState } from 'react';
import './AddFaculty.css'; // Import the CSS file for styling

const FacultyRegister = () => {
  const [formData, setFormData] = useState({
    facultyName: '',
    mobile: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = 'http://localhost:8080/api/faculty/register'; // Replace with your backend endpoint

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Faculty added successfully!');
        console.log(data);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        setMessage('Failed to add faculty. Please try again.');
      }
    } catch (error) {
      console.error('Error adding faculty:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="add-faculty-container">
      <h2>Registration</h2>
      <form className="add-faculty-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Faculty Name:</label>
          <input
            type="text"
            name="facultyName"
            value={formData.facultyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-btn" type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default FacultyRegister;
