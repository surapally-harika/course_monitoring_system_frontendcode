import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Admin = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:8080/api/admin/login" // Replace with your login endpoint
      : "http://localhost:8080/api/admin/register"; // Replace with your register endpoint
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isLogin ? { username: formData.username, password: formData.password } : formData),
      });

      const contentType = response.headers.get("Content-Type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        // If it's JSON, parse it
        data = await response.json();
      } else {
        // If it's plain text, treat it as a string
        data = await response.text();
      }

      if (response.ok) {
        alert(isLogin ? "Login successful!" : "Registration successful!");
        console.log("Response:", data);

        if (isLogin) {
          // Store user data in localStorage (if applicable)
          localStorage.setItem('admin', JSON.stringify(data));

          // Redirect to the admin panel after successful login
          navigate('/admin-panel');
        }
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
  };
  

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: 'url("https://www.itcilo.org/sites/default/files/courses/cover-images/A9717016.jpeg")', // Replace with your background image URL
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    form: {
      // backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "300px",
      textAlign: "center",
      border:'1px solid black'
    },
    heading: {
      marginBottom: "20px",
      fontSize: "24px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "green",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    toggle: {
      marginTop: "10px",
      color: "#007BFF",
      cursor: "pointer",
      textDecoration: "underline",
    },
    error: {
      color: "red",
      fontSize: "14px",
      marginTop: "10px",
    },
  };

  return (
    <>
      
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>{isLogin ? "Login" : "Register"}</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          {isLogin ? "Login" : "Register"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
        <p
          style={styles.toggle}
          onClick={() => {
            setIsLogin(!isLogin);
            setFormData({ username: "", password: "" });
          }}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </form>
      </div>
      </>
  );
};

export default Admin;
