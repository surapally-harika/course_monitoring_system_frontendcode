import React, { useState } from 'react';
import './AddCourse.css'; // Import the CSS file

const AddCourse = () => {

  const [formData, setFormData] = useState({
    coursename: '',
    fee: '',
    description: '',
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
      const endpoint = 'http://localhost:8080/api/course/add';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Course added successfully!');
        console.log(data);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        setMessage('Failed to add course. Please try again.');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div style={{
     
      backgroundImage: 'url("https://www.itcilo.org/sites/default/files/courses/cover-images/A9717016.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: '1px solid #ddd',
      borderRadius: '8px',
      // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}>
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <form className="add-course-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name:</label>
          <input
            type="text"
            name="coursename"
            value={formData.coursename}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Fee:</label>
          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-btn" type="submit">Add Course</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
    </div>
  );
};

export default AddCourse;
