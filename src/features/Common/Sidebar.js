// src/components/Sidebar.js

import React from 'react';
import './common.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidenav">
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">Dashboard</span>
        </Link>
        <hr />
        <Link to="/details">Go to SIM Details</Link>
        <hr />
        <Link to="/senderid">SenderID</Link>
      </div>
    </div>
  );
}

export default Sidebar;
