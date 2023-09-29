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
  const [info, setInfo] = useState([]);

  const [file, setFile] = useState(null);
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [entriesPerUser, setEntriesPerUser] = useState(0);
  const [distributedData, setDistributedData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fileInput = useRef(null);
  useEffect(() => {
    // Fetch user list from your API
    axios
      // .get("http://localhost:9800/api/user/getUserList")
      .get("https://ibizoserver.onrender.com/api/user/getUserList")

      .then((response) => {
        setUserList(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleCheckboxChange = (user) => {
    const updatedSelectedUsers = [...selectedUsers];

    if (updatedSelectedUsers.includes(user)) {
      updatedSelectedUsers.splice(updatedSelectedUsers.indexOf(user), 1);
    } else {
      updatedSelectedUsers.push(user);
    }

    setSelectedUsers(updatedSelectedUsers);
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === userList.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers([...userList]);
    }
  };

  const handleDistributeData = () => {
    const requestData = {
      numUsers: selectedUsers.length,
      desiredData: count
    };

    axios
      // .post("http://localhost:9800/userInfo/getDistributedData", requestData)
      .post("https://ibizoserver.onrender.com/userInfo/getDistributedData", requestData)

      .then((response) => {
        const {
          entriesPerUser,
          distributedData,
          usedData,
          unusedData
        } = response.data;

        setEntriesPerUser(entriesPerUser);
        setDistributedData(distributedData);

        console.log("Used Data:", usedData);
        console.log("Unused Data:", unusedData);

        console.log("Data distributed successfully:", distributedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };



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

      // const response = await axios.post('http://localhost:9800/userInfo/importUser', formData, {
        const response = await axios.post('https://ibizoserver.onrender.com/userInfo/importUser', formData, {
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

  const handleSplitDataClick = () => {
    setShowModal(true);
  };
  useEffect(() => {
    fetchDataInfo();
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await axios.get('http://localhost:9800/userInfo/getUserData');
      const response = await axios.get('https://ibizoserver.onrender.com/userInfo/getUserData');

      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDataInfo = async () => {
    try {
      // const response = await axios.get('http://localhost:9800/userInfo/getUserDataDistributed');
      const response = await axios.get('https://ibizoserver.onrender.com/userInfo/getUserDataDistributed');

      if (response.data.success) {
        setInfo(response.data.data);
        console.log(response.data.data, "setginfoss")
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
  const Modal = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <div style={{ background: '#ffffff', border: '6px solid #ccc', padding: '40px 28px 40px 28px', borderRadius: '6px', maxWidth: '40vw', maxHeight: '80vh', overflow: 'auto', position: 'relative' }}>
          <span onClick={() => setShowModal(false)} style={{ cursor: 'pointer', float: 'right', fontSize: '20px' }}>&times;</span>
          <h2 style={{
            boxSizing: 'border-box',
            color: '#242424',
            textAlign: 'left',
            font: '500 20px "Poppins", sans-serif',
            position: 'relative',
            width: '215px'
          }}>
            Data splitting
          </h2>

          <div style={{ marginBottom: '10px' }}>
            <label>
              Count:
              <input
                type="number"
                value={count}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value, 10);
                  if (!isNaN(inputValue)) {
                    setCount(inputValue);
                  }
                }}
                style={{ marginLeft: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </label>
          </div>
          <table style={{ borderCollapse: 'collapse', background: 'white', width: '90%', marginTop: '40px' }}>
            <thead>
              <tr>
                <th scope="col" style={{ border: 'none', padding: '0.8rem', background: '#f0f0f0', textAlign: 'center', width: '442px', height: '36px' }}>No</th>
                <th scope="col" style={{ border: 'none', padding: '0.8rem', background: '#f0f0f0', textAlign: 'center', width: '442px', height: '36px' }}>Name</th>
                <th scope="col" style={{ border: 'none', padding: '0.8rem', background: '#f0f0f0', textAlign: 'center', width: '442px', height: '36px' }}>Ongoing</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={user._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user)}
                      onChange={() => handleCheckboxChange(user)}
                    />
                  </td>
                  <td style={{
                    boxSizing: 'border-box',
                    border: 'none',
                    padding: '0.8rem',
                    textAlign: 'center',
                    width: '442px',
                    height: '36px'
                  }}>
                    {user.first_name} {user.last_name}
                  </td>
                  <td style={{
                    boxSizing: 'border-box',
                    border: 'none',
                    padding: '0.8rem',
                    textAlign: 'center',
                    width: '442px',
                    height: '36px'
                  }}>
                    {24}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button
              onClick={handleDistributeData}
              style={{
                background: '#2e2e2e',
                borderRadius: '8px',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              Split Data
            </button>
          </div>
        </div>
      </div>
    );
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
                {/* <div>
                  {info.map((item, index) => (
                    <div key={index}>
                      <p>User: {item.user.first_name} {item.user.last_name}</p>
                      <p>Data Length: {item.data.length}</p>
                    </div>
                  ))}
                </div> */}
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
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>{1}</td>
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>100</td>
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>{user.usedData || 'N/A'}</td>
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>{user.unusedData || 'N/A'}</td>
                    <td style={{ border: 'none', padding: '0.8rem', textAlign: 'center' }}>
                      <a href="#" onClick={handleSplitDataClick} style={{ color: '#0da000', textAlign: 'left', fontSize: '16px', fontFamily: 'Poppins, sans-serif', position: 'relative' }}>
                        split Data
                        <img
                          src="/images/fi_arrow-up-right.svg"
                          alt="Arrow Icon"
                          className="fi-arrow-up-right"
                          style={{ flexShrink: 0, position: 'relative', overflow: 'visible' }}
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showModal && <Modal onClose={() => setShowModal(false)} />}      </div>
    </>

  );
}

export default DataList;
