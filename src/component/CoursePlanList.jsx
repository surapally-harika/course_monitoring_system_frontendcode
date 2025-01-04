import React, { useState, useEffect } from 'react';


function CoursePlanList() {
  const [coursePlans, setCoursePlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [searchBatchId, setSearchBatchId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/courseplan/view", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCoursePlans(data);
        setFilteredPlans(data); // Initially display all plans
        console.log(data);
      })
      .catch((err) => {
        setError("Error fetching course plans: " + err.message);
      });
  }, []);

  const handleSearch = () => {
    if (searchBatchId.trim() === "") {
      setFilteredPlans(coursePlans); // Reset to all plans if search is empty
      setError("");
      return;
    }

    const filtered = coursePlans.filter(
      (plan) => plan.batch.batchid.toString() === searchBatchId.trim()
    );

    if (filtered.length > 0) {
      setFilteredPlans(filtered);
      setError("");
    } else {
      setFilteredPlans([]);
      setError("No course plans found for the provided Batch ID.");
    }
  };

  return (
    <>
      
      <div style={{ 
      padding: '20px',
     
      }}>
        <h1>Course Plan Details</h1>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter Batch ID"
            value={searchBatchId}
            onChange={(e) => setSearchBatchId(e.target.value)}
            style={{
              padding: '10px',
              marginRight: '10px',
              width: '200px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </div>

        {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

        {filteredPlans.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '10px' }}>CoursePlan ID</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Batch ID</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Day Number</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Topic</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.planid}>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{plan.planid}</td>
                  <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                    {plan.batch.batchid}
                  </td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{plan.daynumber}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{plan.topic}</td>
                  <td style={{ border: '1px solid black', padding: '10px' }}>{plan.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !error && <p style={{ marginTop: '20px' }}>No course plans available.</p>
        )}
      </div>
    </>
  );
}

export default CoursePlanList;
