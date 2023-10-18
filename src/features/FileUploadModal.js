import React from 'react';

import { useState } from 'react';
import axios from 'axios';
import { API_BASEURL } from '../environment';
// import { createUser } from './Service/auth.service';
const FileUploadModal = ({ handleClose  }) => {
  const popupStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    backgroundColor: '#fff',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
  };

  const closeButtonStyle = {
    padding: '10px 20px',
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: '0 10px',
    fontSize: '16px',
  };

  const uploadButtonStyle = {
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: '0 10px',
    fontSize: '16px',
  };

  const inputStyle = {
    marginBottom: '20px',
    padding: '12px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const buttonContainerStyle = {
    marginTop: '20px',
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        alert('Please select a file'); // You can replace this with your desired way of showing messages
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_BASEURL}/api/addData/addExcelData`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert(response.data.msg); 
        handleClose(); 
      } else {
        alert(response.data.msg); 
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading file'); 
    }
  };

  return (
<div style={popupStyle}>
      <h2 style={{ marginBottom: '30px', color: '#343a40' }}>Upload Excel File</h2>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        style={inputStyle}
      />
      <div style={buttonContainerStyle}>
        <button onClick={handleUpload} style={uploadButtonStyle}>
          Upload
        </button>
        <button onClick={handleClose} style={closeButtonStyle}>
          Close
        </button>
      </div>
    </div>

  );
  
};

export default FileUploadModal;
