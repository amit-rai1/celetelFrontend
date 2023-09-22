// DataList.js

import React, { useState, useEffect, useRef } from 'react';
import Header from '../Common/HeaderAdmin';
import Sidebar from '../Common/Sidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 

const DataList = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [userData, setUserData] = useState([]);
  const [file, setFile] = useState(null);

  const fileInput = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        toast.error('Please select a file');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:9800/userInfo/importUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        fetchData(); // Update data after successful upload
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error uploading file');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9800/userInfo/getUserData');
      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckboxClick = (index) => {
    const updatedSelection = [...selectedCheckboxes];
    if (updatedSelection.includes(index)) {
      updatedSelection.splice(updatedSelection.indexOf(index), 1);
    } else {
      updatedSelection.push(index);
    }
    setSelectedCheckboxes(updatedSelection);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, padding: '16px' }}>
          <div style={{ marginBottom: '2rem', padding: '0 1rem', marginLeft: '200px' }}>
            <div>
              <div style={{ textAlign: 'center' }}>
                <button
                  style={{
                    background: '#2e2e2e',
                    borderRadius: '12px',
                    padding: '8px 10px',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    width: '120px',
                    position: 'absolute',
                    top: '60px',
                    right: '150px',
                    color: '#ffffff',
                    fontSize: '16px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                  className="add-new"
                  onClick={() => fileInput.current.click()} // Open file dialog
                >
                  <img
                    src="/images/fi_plus.svg"
                    alt="Copy"
                    style={{
                      verticalAlign: 'middle',
                      boxSizing: 'border-box',
                      flexShrink: 0,
                      position: 'relative',
                      overflow: 'visible',
                      color: '#FFFFFF'
                    }}
                    className="fi-plus"
                  />
                  Add data
                </button>
                <button
                  style={{
                    boxSizing: 'border-box',
                    borderRadius: '12px',
                    padding: '8px 10px',
                    color: '#2e2e2e',
                    textAlign: 'center',
                    font: '400 18px "Inter", sans-serif',
                    position: 'absolute',
                    top: '60px',
                    right: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={handleUpload} // Upload button
                >
                  Upload
                </button>
              </div>
            </div>

            <input
              type="file"
              accept=".xlsx, .xls"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              ref={fileInput}
            />

            <button
              style={{
                boxSizing: 'border-box',
                borderRadius: '12px',
                padding: '8px 10px',
                color: '#2e2e2e',
                textAlign: 'center',
                font: '400 18px "Inter", sans-serif',
                position: 'absolute',
                top: '60px',
                right: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={handleUpload}
            >
              Upload
            </button>

            <table className="table" style={{ borderCollapse: 'collapse', background: 'white', width: '90%', marginTop: '40px' }}>
              <thead>
                <tr>
                  <th scope="col" style={{ border: 'none', padding: '0.8rem', background: '#f0f0f0', textAlign: 'center', width: '10%' }}>No</th>
                  <th scope="col" style={{ border: 'none', padding: '0.8rem', background: '#f0f0f0', textAlign: 'center', width: '10%' }}>Name</th>
                  <th scope="col" style={{ border: 'none', padding: '0.8rem', background: '#f0f0f0', textAlign: 'center', width: '10%' }}>Files</th>
                  <th scope="col" style={{ border: 'none', padding: '0.8rem', background: '#f0f0f0', textAlign: 'center', width: '15%' }}>Total Data</th>
                  <th scope="col" style={{ border: 'none', padding: '0.8rem', background: '#f0f0f0', textAlign: 'center', width: '10%' }}>Used Data</th>
                  <th scope="col" style={{ border: 'none', padding: '0.8rem', background: '#f0f0f0', textAlign: 'center', width: '10%' }}>Unused Data</th>
                  <th scope="col" style={{ border: 'none', padding: '0.8rem', background: '#f0f0f0', textAlign: 'center', width: '10%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={user._id}>
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={`customCheck${index}`}
                          checked={selectedCheckboxes.includes(index)}
                          onChange={() => handleCheckboxClick(index)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`customCheck${index}`}
                          style={{ marginLeft: '0.5rem' }}
                        >
                          {index + 1}
                        </label>
                      </div>
                    </td>
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>{user?.filename}</td>
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>{user?.numberOfFiles}</td>
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>100</td>
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>{user.usedData || 'N/A'}</td>
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>{user.unusedData || 'N/A'}</td>
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>split Data</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataList;
