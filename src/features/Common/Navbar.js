import React from 'react';
import './common.css';

function Navbar() {

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
        <button type="submit" style={buttonStyle}>LogOut</button>
</div>
      </div>
    </nav>
  );
}

export default Navbar;
