import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/batch/update'; // Update with your API URL

function UpdateBatch({ batchId, onBatchUpdated }) {
  const [batchData, setBatchData] = useState({
    courseId: '',
    facultyId: '',
    noOfstudents: '',
    date: '',
    duration: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (batchId) {
      fetchBatchData();
    }
  }, [batchId]);

  const fetchBatchData = async () => {
    try {
      const response = await fetch(`${API_URL}/${batchId}`);
      const data = await response.json();

      if (response.ok) {
        setBatchData(data);
      } else {
        setError(data.message || 'Error fetching batch data.');
      }
    } catch (err) {
      setError('Error connecting to the server.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBatchData({ ...batchData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/${batchId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Batch updated successfully!');
        onBatchUpdated();  // Call the parent callback to refresh the batch list
      } else {
        setError(data.message || 'Error updating batch.');
      }
    } catch (err) {
      setError('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Batch</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="courseId"
          placeholder="Course ID"
          value={batchData.courseId}
          onChange={handleInputChange}
        //   required
        />
        <input
          type="number"
          name="facultyId"
          placeholder="Faculty ID"
          value={batchData.facultyId}
          onChange={handleInputChange}
        //   required
        />
        <input
          type="number"
          name="noOfstudents"
          placeholder="Number of Students"
          value={batchData.noOfStudents}
          onChange={handleInputChange}
        //   required
        />
        <input
          type="date"
          name="date"
          placeholder="Batch Date"
          value={batchData.batchDate}
          onChange={handleInputChange}
        //   required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (hours)"
          value={batchData.duration}
          onChange={handleInputChange}
        //   required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Batch'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default UpdateBatch;
