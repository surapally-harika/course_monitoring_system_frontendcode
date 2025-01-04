import React, { useState } from 'react';
import './DayWisePlan.css';
import Navbar from './Navbar';
 

const DayWisePlan = () => {
  const [formData, setFormData] = useState({
    daynumber: '',
    batchid: '',
    topic: '',
    status: 'pending',
  });

 const [message, setMessage] = useState('');

  // Update state with form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace this with your actual API endpoint
      const endpoint = 'http://localhost:8080/api/courseplan/create';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Course plan added successfully!');
        console.log(data); // Debugging response
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        setMessage('Failed to add course plan. Please try again.');
      }
    } catch (error) {
      console.error('Error adding course plan:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <>
      <div style={{
     
      backgroundImage: 'url("https://www.itcilo.org/sites/default/files/courses/cover-images/A9717016.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: '1px solid #ddd',
      borderRadius: '8px',
      // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}>
    <div className="add-course-plan">
      <h2>Add Course Plan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Day Number:</label>
          <input
            type="number"
            name="daynumber"
            value={formData.daynumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Batch ID:</label>
          <input
            type="text"
            name="batchid"
            value={formData.batchid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Topic:</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">submit</button>
      </form>
      {message && <p>{message}</p>}
        </div>
        </div>
      </>
  );
};

export default DayWisePlan;
