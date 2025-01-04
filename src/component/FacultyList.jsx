import React, { useState, useEffect } from 'react';


function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [searchFacultyId, setSearchFacultyId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/faculty/view", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFaculties(data);
        setFilteredFaculties(data); // Initially display all faculties
      })
      .catch((err) => {
        setError("Error fetching faculty data: " + err.message);
      });
  }, []);

  const handleSearch = () => {
    if (searchFacultyId.trim() === "") {
      setFilteredFaculties(faculties); // Reset to all faculties if search is empty
      setError("");
      return;
    }

    const filtered = faculties.filter(
      (faculty) => faculty.facultyid === searchFacultyId.trim()
    );

    if (filtered.length > 0) {
      setFilteredFaculties(filtered);
      setError("");
    } else {
      setFilteredFaculties([]);
      setError("No faculty found with the provided Faculty ID.");
    }
  };

    return (
        <>
            
    <div style={{ padding: '20px' }}>
      <h1>Faculty Details</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Faculty ID"
          value={searchFacultyId}
          onChange={(e) => setSearchFacultyId(e.target.value)}
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

      {filteredFaculties.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '10px' }}>Faculty ID</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Faculty Name</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Mobile</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Email</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Password</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculties.map((faculty) => (
              <tr key={faculty.facultyid}>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                  {faculty.facultyid}
                </td>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                  {faculty.facultyname}
                </td>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                  {faculty.mobile}
                </td>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                  {faculty.email}
                </td>
                <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                  {faculty.password}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p style={{ marginTop: '20px' }}>No faculty details available. Please check back later.</p>
      )}
            </div>
            </>
  );
}

export default FacultyList;
