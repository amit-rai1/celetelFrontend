import React, { useState, useEffect } from 'react';
import './common.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("Logout successfully");

    setLoggedIn(false);
    navigate('/login');

  }
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
        <button type="submit" style={buttonStyle}onClick={handleLogout}>LogOut</button>
</div>
      </div>
    </nav>
  );
}

export default Navbar;
