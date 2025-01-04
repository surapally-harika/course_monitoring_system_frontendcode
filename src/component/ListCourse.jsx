import React, { useState, useEffect } from "react";

function ListCourse() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/course/view", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((response) => {
        setCourses(response);
        setFilteredCourses(response); // Initialize filtered list with all courses
      })
      .catch((err) => {
        setError("Error fetching course data: " + err.message);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) =>
          course.couseid.toString().includes(term.trim())
        )
      );
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Course Details</h1>

        <input
          type="text"
          placeholder="Search by Course ID"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "10px",
            marginBottom: "20px",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

        {filteredCourses.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Course ID
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Course Name
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Fee
                </th>
                <th style={{ border: "1px solid black", padding: "10px" }}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.couseid}>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    {course.couseid}
                  </td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    {course.coursename}
                  </td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    {course.fee}
                  </td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>
                    {course.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !error && (
            <p style={{ marginTop: "20px" }}>
              No courses found matching the search criteria.
            </p>
          )
        )}
      </div>
    </>
  );
}

export default ListCourse;
