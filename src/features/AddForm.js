// UserProfile.js

import React, { useState, useEffect } from 'react';
import './AddForm.css';

import axios from 'axios'; // Import Axios
import moment from 'moment';


function AddForm() {
    const ITEMS_PER_PAGE = 1; // Set the number of items per page



    const [userData, setUserData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
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

        fetchData();
    }, []);

    const loadNextUserData = () => {
        if (currentIndex < userData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };
    const loadPreviousUserData = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(userData.length - 1);
        }
    };
    const getCurrentPageNumber = () => {
        return Math.floor(currentIndex / ITEMS_PER_PAGE) + 1;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to the API


            // Handle the response as needed
        } catch (error) {
            // Handle any errors
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {

    };
    // Function to copy the input field value to clipboard
    const copyToClipboard = (inputId) => {
        const inputElement = document.getElementById(inputId);
        inputElement.select();
        document.execCommand('copy');
    }

    // Function to update the time
    const updateTime = () => {
        const currentTimeElement = document.getElementById("current-time");
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const currentTime = new Date().toLocaleTimeString(undefined, options);
        currentTimeElement.textContent = currentTime;
    }

    // Update the time initially and every second (1000 milliseconds)
    React.useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            {/* Header */}
            <header>
                <div className="logo">
                    <img src="images/Group 427319106.svg" alt="Profile Picture" />
                </div>
                <div className="profile">
                    <img src="images/Ellipse 1.png" alt="Profile Picture" />
                    <p>
                        {/* {userData[currentIndex]?.firstname} {userData[currentIndex]?.lastname} */}
                        {/* {userData[currentIndex]?.Address} {userData[currentIndex]?.State} */}
                        {/* {userData[currentIndex]?.City} {userData[currentIndex]?.Email} */}
                        {/* {userData[currentIndex]} */}
                        <br />
                        <div id="current-time">Loading...</div>
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <div className="container">

                {/* Form components here */}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <div className="input-container">
                            <input type="text" id="firstName"
                                name="firstName"
                                value={userData[currentIndex]?.firstname || ''}
                                onChange={handleChange} />
                            <button className="copy-button" onClick={() => copyToClipboard('firstName')}>
                                <span style={{ color: 'white' }}>Copy</span>
                                <img src="/images/copy.svg" alt="Copy" style={{ verticalAlign: 'middle' }} />
                            </button>
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName"
                            name="lastName"
                            value={userData[currentIndex]?.lastname || ''}
                            onChange={handleChange}
                        />
                        <button className="copy-button" onClick={() => copyToClipboard('lastName')}>
                            <span style={{ color: 'white' }}>Copy</span>
                            <img src="/images/copy.svg" alt="Copy" style={{ verticalAlign: 'middle' }} />
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email ID</label>
                        <input type="text" id="email"
                            name="lastName"
                            value={userData[currentIndex]?.Email || ''}
                            onChange={handleChange} />
                        <button className="copy-button" onClick={() => copyToClipboard('email')}>
                            <span style={{ color: 'white' }}>Copy</span>
                            <img src="/images/copy.svg" alt="Copy" style={{ verticalAlign: 'middle' }} />
                        </button>
                    </div>


                    <div className="form-group">
                        <label htmlFor="zip">Zip</label>
                        <input type="text" id="zip"
                            value={userData[currentIndex]?.Zip || ''}
                            onChange={handleChange} />
                        <button className="copy-button" onClick={() => copyToClipboard('zip')}>
                            <span style={{ color: 'white' }}>Copy</span>
                            <img src="/images/copy.svg" alt="Copy" style={{ verticalAlign: 'middle' }} />
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address"
                            value={userData[currentIndex]?.Address || ''}
                            onChange={handleChange} />
                        <button className="copy-button" onClick={() => copyToClipboard('address')}>
                            <span style={{ color: 'white' }}>Copy</span>
                            <img src="/images/copy.svg" alt="Copy" style={{ verticalAlign: 'middle' }} />
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city"
                            value={userData[currentIndex]?.City || ''}
                            onChange={handleChange} />
                        <button className="copy-button" onClick={() => copyToClipboard('city')}>
                            <span style={{ color: 'white' }}>Copy</span>
                            <img src="/images/copy.svg" alt="Copy" style={{ verticalAlign: 'middle' }} />
                        </button>
                    </div>


                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input type="text" id="state"
                            value={userData[currentIndex]?.State || ''}
                            onChange={handleChange} />
                        <button className="copy-button" onClick={() => copyToClipboard('state')}>
                            <span style={{ color: 'white' }}>Copy</span>
                            <img src="/images/copy.svg" alt="Copy" style={{ verticalAlign: 'middle' }} />
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" id="phone"
                            value={userData[currentIndex]?.Homephone}
                            onChange={handleChange} />
                        <button className="copy-button" onClick={() => copyToClipboard('phone')}>
                            <span style={{ color: 'white' }}>Copy</span>
                            <img src="/images/copy.svg" alt="Copy" style={{ verticalAlign: 'middle' }} />
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="text" id="dob"
                            value={userData[currentIndex]?.Dateofbirth}

                            onChange={handleChange} />
                        <button className="copy-button" onClick={() => copyToClipboard('dob')}>
                            <span style={{ color: 'white' }}>Copy</span>
                            <img src="/images/copy.svg" alt="Copy" style={{ verticalAlign: 'middle' }} />
                        </button>
                    </div>

                    <div className="button">
                        <button type="button" onClick={loadPreviousUserData}style={{ marginRight: '10px' }}>
                            Load Previous
                        </button>

                        <button type="button" onClick={loadNextUserData}>
                            Load Next

                        </button>
                        <div className="page-number">

                        <span>Page {getCurrentPageNumber()}</span>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    );
}

export default AddForm;
