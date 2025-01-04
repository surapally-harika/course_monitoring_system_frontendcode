import React, { useState } from 'react';
import './AddFaculty.css'; // Import the CSS file for styling

const AdminRegister = () => {
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
      const endpoint = 'http://localhost:8080/api/admin/register'; // Replace with your backend endpoint

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('admin register successfully!');
        console.log(data);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        setMessage('Failed to register admin. Please try again.');
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
          <label>Username/email:</label>
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

export default AdminRegister;
