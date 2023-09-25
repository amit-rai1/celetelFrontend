import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Sidebar() {


  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Display a toast
    toast.success('Logged out successfully!');

    // Navigate to the login page
    navigate('/');
  };
  const wrapperStyle = {
    display: 'flex',
    position: 'relative',
  };

  const sidebarStyle = {
    width: '100px',
    height: '100%',
    background: '#fff',
    padding: '30px 0px',
    position: 'fixed',
    color: '#333', // Dark text color
    zIndex: '1',
    top: '60px', // Adjusted to account for the header height
  };

  const sidebarItemStyle = {
    padding: '15px',
    borderBottom: '1px solid #bdb8d7',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
  };

  const sidebarLinkStyle = {
    color: '#333', // Dark text color
    display: 'block',
    textDecoration: 'none',
  };

  const sidebarIconStyle = {
    width: '25px',
    marginRight: '10px',
    display: 'inline-block',
  };

  const mainContentStyle = {
    width: '100%',
    marginLeft: '250px',
    padding: '20px',
  };

  const infoStyle = {
    margin: '20px',
    color: '#717171',
    lineHeight: '25px',
  };

  const infoDivStyle = {
    marginBottom: '20px',
  };

  return (
    <div className='wrapper' style={wrapperStyle}>
      <div className='sidebar' style={sidebarStyle}>
        <ul>
          <li className='navigation-link' style={sidebarItemStyle}>
            <i className="material-icons" style={sidebarIconStyle}>dashboard</i>
            <Link to='/AdminDashboard' style={sidebarLinkStyle}>Dashboard</Link>
          </li>
          <li className='navigation-link' style={sidebarItemStyle}>
            <i className="material-icons" style={sidebarIconStyle}>show_chart</i>
            <a href='#' style={sidebarLinkStyle}>Analytics</a>
          </li>
          {/* <li className='navigation-link' style={sidebarItemStyle}>
            <i className="material-icons" style={sidebarIconStyle}>person</i>
            <a href='#' style={sidebarLinkStyle}>Employee</a>
          </li> */}
          <li className='navigation-link' style={sidebarItemStyle}>
            <i className="material-icons" style={sidebarIconStyle}>person</i>
            <Link to='/EmpList' style={sidebarLinkStyle}>Employee</Link>
          </li>
          <li className='navigation-link' style={sidebarItemStyle}>
            <i className="material-icons" style={sidebarIconStyle}>insert_chart</i>
            <Link to='/dataList' style={sidebarLinkStyle}>Data</Link>
          </li>
          {/* <li className='navigation-link' style={sidebarItemStyle}>
            <i className="material-icons" style={sidebarIconStyle}>headset_mic</i>
            <a href='#' style={sidebarLinkStyle}>Support</a>
          </li> */}
          <li className='navigation-link' style={sidebarItemStyle}>
            <i className="material-icons" style={sidebarIconStyle}>settings</i>
            <a href='#' style={sidebarLinkStyle}>Settings</a>
          </li>
        </ul>
        <ul style={{ position: 'absolute', bottom: '70px', width: '100%', listStyleType: 'none', padding: '0' }}>
      <li className='navigation-link' style={{ marginBottom: '10px', textAlign: 'center' }}>
        <button
          style={{
            background: '#008000',
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
      </li>
    </ul>
      </div>

    </div>
  );
}


export default Sidebar;
