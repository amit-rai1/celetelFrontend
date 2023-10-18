import React, { useState, useEffect } from 'react';
import './common.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Sidebar() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const notify = () => toast.error("Please login for more information");

  return (
    <div className="sidenav">
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">Dashboard</span>
        </Link>
        <hr />
        {loggedIn ? (
          <Link to="/userdashboard/details">Go to SIM Details</Link>
        ) : (
          <span onClick={notify} style={{cursor: 'pointer'}}>Go to SIM Details</span>
        )}
        <hr />
        {loggedIn ? (
          <Link to="/senderid">SenderID</Link>
        ) : (
          <span onClick={notify} style={{cursor: 'pointer'}}>SenderID</span>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Sidebar;
