import React, { useState } from 'react';
import axios from 'axios';
import { loginAdmin } from './Service/auth.service';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAdmin(username, password);

      if (response.status === 200) {
        console.log(response.status, "response.success")
        toast.success(response.msg);
        localStorage.setItem('token', response.token)
        navigate('/AddForm');
        console.log(response.token);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <form style={{
        display: 'flex',
        flexDirection: 'column'
      }} onSubmit={handleLogin}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>Login</h2>
        <div style={{
          marginBottom: '15px'
        }}>
          <label htmlFor="username" style={{fontWeight: 'bold'}}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              width: '100%',
              fontSize: '16px',
              marginTop: '5px'
            }}
          />
        </div>
        <div style={{
          marginBottom: '15px'
        }}>
          <label htmlFor="password" style={{fontWeight: 'bold'}}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              width: '100%',
              fontSize: '16px',
              marginTop: '5px'
            }}
          />
        </div>
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
          width: '100%',
          marginTop: '10px'
        }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
