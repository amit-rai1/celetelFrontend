import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Common/Sidebar';
import Header from '../Common/HeaderAdmin.js';
import { useNavigate } from 'react-router-dom';



function AdminDashboard() {

   
   
    return (
        <>
            <Header />

            <Sidebar />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#2e2e2e' }}>Welcome to Admin Dashboard</h1>
            <p style={{ fontSize: '18px', color: '#555555' }}>Working Progress for Analytics</p>
            <img
                src="/images/f8d5daed-6a11-455e-81fa-0f90d621b7f2.png"
                alt="Analytics Graph"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    animation: 'blink 1s infinite alternate', // Add animation property
                }}
            />
        </div>
      
        <style>
            {`
                @keyframes blink {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `}
        </style>
        </>
    );
}

export default AdminDashboard;
