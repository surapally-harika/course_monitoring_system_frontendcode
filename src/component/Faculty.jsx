import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Faculty() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerFacultyName, setRegisterFacultyName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerMobile, setRegisterMobile] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  let navigator = useNavigate();

  // Toggle between Login and Register forms
  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/faculty/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
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
        // Store the returned data (faculty object)
        localStorage.setItem('faculty', JSON.stringify(data));

        alert("Login successful!");

        // Redirect to faculty panel
        navigator('/faculty-panel');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  // Handle registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/faculty/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facultyname: registerFacultyName,
          email: registerEmail,
          mobile: registerMobile,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        toggleForm(); // Switch to login form after successful registration
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {isLoginForm ? (
        <div style={styles.formContainer}>
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p style={styles.error}>{error}</p>}
          </form>
          <a onClick={toggleForm} style={styles.toggleLink}>Don't have an account? Register here.</a>
        </div>
      ) : (
        <div style={styles.formContainer}>
          <h2>Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              placeholder="Faculty Name"
              value={registerFacultyName}
              onChange={(e) => setRegisterFacultyName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="tel"
              placeholder="Mobile"
              value={registerMobile}
              onChange={(e) => setRegisterMobile(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            {error && <p style={styles.error}>{error}</p>}
          </form>
          <a onClick={toggleForm} style={styles.toggleLink}>Already have an account? Login here.</a>
        </div>
      )}
    </div>
  );
}

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
  formContainer: {
    // backgroundColor: 'tra',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '200px',
    height: '300px',
    border: '1px solid black',
    fontSize:'10px',
  },
  input: {
    
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
  toggleLink: {
    display: 'block',
    textAlign: 'center',
    marginTop: '10px',
    cursor: 'pointer',
    color: '#4CAF50',
    textDecoration: 'underline',
  },
};

export default Faculty;
