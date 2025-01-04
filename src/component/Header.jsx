import React from 'react';

const Header = ({ onLogout, userRole }) => {
  return (
    <header className="header">
      <h1>Automated Course Monitoring System</h1>
      {userRole && (
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
