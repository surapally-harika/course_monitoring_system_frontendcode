import React, { useState, useEffect } from "react";


function BatchList() {
  const [batches, setBatches] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");
  const [filteredBatch, setFilteredBatch] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/batch/view", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((response) => {
        setBatches(response);
      })
      .catch((err) => {
        setError("Error fetching batch data: " + err.message);
      });
  }, []);

  const handleSearch = () => {
    if (searchId.trim() === "") {
      setFilteredBatch(null);
      setError("Please enter a valid Batch ID.");
      return;
    }

    const batch = batches.find((b) => b.batchid === parseInt(searchId));
    if (batch) {
      setFilteredBatch(batch);
      setError("");
    } else {
      setFilteredBatch(null);
      setError("No batch found with the provided ID.");
    }
  };

  return (

    <>
      <div  style={{
        // backgroundColor: 'pink,gray',
      // backgroundImage: 'url("https://www.itcilo.org/sites/default/files/courses/cover-images/A9717016.jpeg")',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      // border: '1px solid #ddd',
      //   borderRadius: '8px',
      // opacity: 0.5,
      // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}>
     
    <div style={{ padding: "20px" }}>
      <h1>Batch Details</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Batch ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            width: "200px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {filteredBatch ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "10px" }}>Batch ID</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Course ID</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Faculty ID</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>No. of Students</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Start Date</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Duration (Days)</th>
            </tr>
          </thead>
          <tbody>
            <tr key={filteredBatch.batchid}>
              <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                {filteredBatch.batchid}
              </td>
              <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                {filteredBatch.course.couseid}
              </td>
              <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                {filteredBatch.faculty.facultyid}
              </td>
              <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                {filteredBatch.noOfstudents}
              </td>
              <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                {filteredBatch.date}
              </td>
              <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                {filteredBatch.duration}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        !error &&
        batches.length > 0 && (
          <p style={{ marginTop: "20px" }}>
            Enter a Batch ID to see specific details or browse all batches.
          </p>
        )
      )}

      {/* All Batches */}
      {!filteredBatch && batches.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "10px" }}>Batch ID</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Course ID</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Faculty ID</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>No. of Students</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Start Date</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Duration (Days)</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.batchid}>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                  {batch.batchid}
                </td>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                  {batch.course.couseid}
                </td>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                  {batch.faculty.facultyid}
                </td>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                  {batch.noOfstudents}
                </td>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                  {batch.date}
                </td>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>
                  {batch.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        </div>
        </div>
      </>
  );
}

export default BatchList;
