
import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { getAllData } from '../Service/auth.service';
import Navbar from '../Common/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import { deleteUser } from './Service/auth.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SimDataModal from '../Common/simModel';
// import { Sidebaradmin } from '../Common/adminSidebar';
import { Sidebaradmin } from '../Common/adminSidebar';

import { getSimStatistics } from '../Service/auth.service';

// import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';



const cardStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    marginTop: '5px', // Added margin-top
  };
  
  const cardText = {
    margin: '0',
    fontSize: '1.25rem',
    fontWeight: 'bold'
  };

export const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    // const { isLoggedIn } = useAuth();
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         // Redirect to login page if not authenticated
    //         navigate('/login'); // Use navigate to redirect
    //     }
    // }, [isLoggedIn, navigate]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getSimStatistics();
            setStats(response);
          } catch (error) {
            console.error('Error fetching sim statistics:', error);
            toast.error('An error occurred while fetching sim statistics.');
          }
        };
    
        fetchData();
      }, []);
   


    

     
    return (
        <>
            <Navbar />
            <Sidebaradmin/>
            <div className="main">
        <div style={{ marginTop: '1px' }}> {/* Added inline style for top margin */}
          <div className="row">
            <div className="col-6 col-md-4">
              <div className="card" style={cardStyle}>
                {stats && (
                  <div className="card-body">
                    <h5 className="card-title" style={cardText}>Total sim</h5>
                    <p className="card-text" style={cardText}>{stats.totalSim}</p>
                    <a href="#" className="fa fa-rss"></a>
                  </div>
                )}
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="card" style={cardStyle}>
                {stats && (
                  <div className="card-body">
                    <h5 className="card-title" style={cardText}>Active sim</h5>
                    <p className="card-text" style={cardText}>{stats.totalActive}</p>
                    <a href="#" className="fa fa-rss"></a>
                  </div>
                )}
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="card" style={cardStyle}>
                {stats && (
                  <div className="card-body">
                    <h5 className="card-title" style={cardText}>Inactive sim</h5>
                    <p className="card-text" style={cardText}>{stats.totalInactive}</p>
                    <a href="#" className="fa fa-rss"></a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <table style={{ marginTop: '1rem' }} className="table table-bordered table-hover">
          <h2>Sim detail</h2>

          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Location</th>
                <th scope="col">Total sim</th>
                <th scope="col">Active sims</th>
                <th scope="col">Inactive sims</th>
                <th scope="col">Operators</th>
              </tr>
            </thead>
            <tbody>
              {/* Add dynamic data rows based on your stats */}
              {stats && stats.operatorStats.map((operator, index) => (
                <tr key={index}>
                  <td>{operator._id}</td>
                  <td>{operator.totalActive + operator.totalInactive}</td>
                  <td>{operator.totalActive}</td>
                  <td>{operator.totalInactive}</td>
                  <td>{operator._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </table>
      </div>
        
        </>
    );
};