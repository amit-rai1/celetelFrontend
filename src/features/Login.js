// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { loginAdmin } from './Service/auth.service';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await loginAdmin(username, password);
  
        if (response.status===200) {
            console.log(response.status,"response.success")
          toast.success(response.msg); // Show success toast
          navigate('/AddForm');

        //   alert("successfully login")
          console.log(response.token); // JWT token
          // Handle successful login (e.g., redirect or set user state)
        } else {
          toast.error(response.msg); // Show error toast
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
  

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};



export default Login;
