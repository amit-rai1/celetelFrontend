import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Clear the token from local storage
  //   localStorage.removeItem('token');

  //   // Display a toast
  //   toast.success('Logged out successfully!');

  //   // Navigate to the login page
  //   navigate('/');
  // };
  return (
    <nav className="navbar navbar-light bg-light navbar-default" style={{ width: "100%", height: "60px", border: "none", zIndex: "2" }}>
      <div className="container-fluid frame-427319098" style={{ boxSizing: "border-box", background: "#ffffff", width: "100%", height: "60px", position: "absolute", overflow: "hidden", border: "none", zIndex: "2" }}>
        <a className="navbar-brand group-427319106" href="#" style={{ position: "absolute", inset: "0" }}>
          <img src="/images/Group 427319106.svg" alt="" style={{ width: "auto", height: "100%" }} />
        </a>
       {/* <div style={{ position: 'absolute', top: '5px', right: '50px' }}>
  <button
    style={{
      background:'#008000',
      borderRadius: '6px',
      color: '#fff',
      padding: '8px 12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '10px',
      fontWeight: 'bold',
    }}
    onClick={handleLogout}
  >
    <span style={{ color: 'white', marginRight: '4px' }}>Logout</span>
    <img
      src="/images/logoutIcon.svg"
      alt="Logout"
      style={{ verticalAlign: 'middle' }}
    />
  </button>
</div> */}
</div>
  </nav >
  );
}


export default Header;
