import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';


function Sidebar() {
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
            <a href='#' style={sidebarLinkStyle}>Dashboard</a>
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
          <li className='navigation-link' style={sidebarItemStyle}>
            <i className="material-icons" style={sidebarIconStyle}>headset_mic</i>
            <a href='#' style={sidebarLinkStyle}>Support</a>
          </li>
          <li className='navigation-link' style={sidebarItemStyle}>
            <i className="material-icons" style={sidebarIconStyle}>settings</i>
            <a href='#' style={sidebarLinkStyle}>Settings</a>
          </li>
        </ul>
      </div>

    </div>
  );
}


export default Sidebar;
