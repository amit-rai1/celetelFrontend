import React from 'react';
import './common.css';
import { Link } from 'react-router-dom';
function HomeNavbar() {

  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '10px 60px',
    borderRadius: '7px',
    cursor: 'pointer',
    marginRight:"5px"
    
  };
  return (
    
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
        <img src="/images/celetellogo.jpg" alt="Bootstrap" width="100" height="50" style={{ marginLeft: '15px' }} />
        </a>
        <div>
        <Link to="/login">
        <button type="submit" style={buttonStyle}>Login</button>
        </Link>
</div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
