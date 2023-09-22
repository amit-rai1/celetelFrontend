// UserProfile.js

import React, { useState, useEffect } from 'react';
import './AddForm.css';

import axios from 'axios'; // Import Axios
import moment from 'moment';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function AddForm() {

    const navigate = useNavigate();

    const ITEMS_PER_PAGE = 1; // Set the number of items per page



    const [userData, setUserData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            console.error('userId not found in local storage');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9800/userInfo/getUserDataByUserId?id=${userId}`);
                if (response.data.success) {
                    setUserData(response.data.data);

                    console.log(response.data.data, "data")
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);






    useEffect(() => {
        const handleKeyPress = (event) => {
            const { key } = event;
            const inputId = event.target.id;

            if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowRight' || key === 'ArrowLeft') {
                event.preventDefault();
                const inputs = document.getElementsByTagName('input');
                const currentIndex = Array.from(inputs).findIndex(input => input.id === inputId);

                const numRows = 2; // Assuming 2 inputs per row for this example

                switch (key) {
                    // case 'ArrowUp':
                    //     // Navigate to the input above (if possible)
                    //     if (inputs[currentIndex - numRows]) {
                    //         inputs[currentIndex - numRows].focus();
                    //         copyToClipboard(inputs[currentIndex - numRows].id);
                    //     }
                    //     break;

                    // case 'ArrowDown':
                    //     // Navigate to the input below (if possible)
                    //     if (inputs[currentIndex + numRows]) {
                    //         inputs[currentIndex + numRows].focus();
                    //         copyToClipboard(inputs[currentIndex + numRows].id);
                    //     }
                    //     break;

                    case 'ArrowRight':
                        // Navigate to the input on the right (if possible)
                        if (inputs[currentIndex + 1]) {
                            inputs[currentIndex + 1].focus();
                            copyToClipboard(inputs[currentIndex + 1].id);
                        }
                        break;

                    case 'ArrowLeft':
                        // Navigate to the input on the left (if possible)
                        if (inputs[currentIndex - 1]) {
                            inputs[currentIndex - 1].focus();
                            copyToClipboard(inputs[currentIndex - 1].id);
                        }
                        break;

                    default:
                        break;
                }
            } else if (key === 'Enter') {
                // Handle Enter key press
                event.preventDefault();
                handleSubmit(event);
            }
        }

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
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
    const copyToClipboard = (inputId, buttonId) => {
        const inputElement = document.getElementById(inputId);
        inputElement.select();
        document.execCommand('copy');

        const copyButton = document.getElementById(buttonId);

        if (copyButton) {
            copyButton.style.backgroundColor = 'green';

            // setTimeout(() => {
            //     copyButton.style.backgroundColor = ''; // Reset to default color
            // }, 1000);
        }
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


    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');

        // Display a toast
        toast.success('Logged out successfully!');

        // Navigate to the login page
        navigate('/');
    };
    return (
        <div className='header'>
            {/* Header */}
            <header>
                <div className="logo">
                    <img src="images/Group 427319106.svg" alt="Profile Picture" />
                </div>
                <div className="profile">
                    <img src="images/Ellipse 1.png" alt="Profile Picture" />
                    <div>
                        <div className='ptext'>  <p>
                            {userData[currentIndex]?.data[currentIndex]?.firstname} {userData[currentIndex]?.data[currentIndex]?.lastname}
                            <br />
                            <div id="current-time">Loading...</div>
                        </p></div>
                        <div className='logout'>
                            <button
                                id="copyLogoutButton"
                                className="custom-button"
                                onClick={handleLogout}
                            >
                                <span style={{ color: 'white' }}>logout</span>
                                <img
                                    src="/images/logoutIcon.svg"
                                    alt="Logout"
                                    style={{ verticalAlign: 'middle' }}
                                />
                            </button></div>

                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container">

                {/* Form components here */}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <div className="input-container">
                            <div className="row-4">
                                {/* <div className="col-12">                            */}
                                <input type="text" id="firstName"
                                    name="firstName"
                                    value={userData[currentIndex]?.data[currentIndex]?.firstname || ''}
                                    onChange={handleChange} />
                                <button
                                    id="copyFirstNameButton"
                                    className="copy-button"
                                    onClick={() => copyToClipboard('firstName', 'copyFirstNameButton')}
                                >
                                    <span style={{ color: 'white' }}>Copy</span>
                                    <img
                                        src="/images/copy.svg"
                                        alt="Copy"
                                        style={{ verticalAlign: 'middle' }}
                                    />
                                </button>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName"
                            name="lastName"
                            value={userData[currentIndex]?.data[currentIndex]?.lastname || ''}
                            onChange={handleChange}
                        />
                        <button
                            id="copyLastButton"
                            className="copy-button"
                            onClick={() => copyToClipboard('lastName', 'copyLastButton')}
                        >
                            <span style={{ color: 'white' }}>Copy</span>
                            <img
                                src="/images/copy.svg"
                                alt="Copy"
                                style={{ verticalAlign: 'middle' }}
                            />
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email ID</label>
                        <input type="text" id="email"
                            name="email"
                            value={userData[currentIndex]?.data[currentIndex]?.Email || ''}
                            onChange={handleChange} />
                        <button
                            id="copyEmailButton"
                            className="copy-button"
                            onClick={() => copyToClipboard('email', 'copyEmailButton')}
                        >
                            <span style={{ color: 'white' }}>Copy</span>
                            <img
                                src="/images/copy.svg"
                                alt="Copy"
                                style={{ verticalAlign: 'middle' }}
                            />
                        </button>
                    </div>


                    <div className="form-group">
                        <label htmlFor="zip">Zip</label>
                        <input type="text" id="zip"
                            value={userData[currentIndex]?.data[currentIndex]?.Zip || ''}
                            onChange={handleChange} />
                        <button
                            id="copyZipButton"
                            className="copy-button"
                            onClick={() => copyToClipboard('zip', 'copyZipButton')}
                        >
                            <span style={{ color: 'white' }}>Copy</span>
                            <img
                                src="/images/copy.svg"
                                alt="Copy"
                                style={{ verticalAlign: 'middle' }}
                            />
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address"
                            value={userData[currentIndex]?.data[currentIndex]?.Address || ''}
                            onChange={handleChange} />
                        <button
                            id="copyAddressButton"
                            className="copy-button"
                            onClick={() => copyToClipboard('address', 'copyAddressButton')}
                        >
                            <span style={{ color: 'white' }}>Copy</span>
                            <img
                                src="/images/copy.svg"
                                alt="Copy"
                                style={{ verticalAlign: 'middle' }}
                            />
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city"
                            value={userData[currentIndex]?.data[currentIndex]?.City || ''}
                            onChange={handleChange} />
                        <button
                            id="copyCityButton"
                            className="copy-button"
                            onClick={() => copyToClipboard('city', 'copyCityButton')}
                        >
                            <span style={{ color: 'white' }}>Copy</span>
                            <img
                                src="/images/copy.svg"
                                alt="Copy"
                                style={{ verticalAlign: 'middle' }}
                            />
                        </button>
                    </div>


                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input type="text" id="state"
                            value={userData[currentIndex]?.data[currentIndex]?.State || ''}
                            onChange={handleChange} />
                        <button
                            id="copyStateButton"
                            className="copy-button"
                            onClick={() => copyToClipboard('state', 'copyStateButton')}
                        >
                            <span style={{ color: 'white' }}>Copy</span>
                            <img
                                src="/images/copy.svg"
                                alt="Copy"
                                style={{ verticalAlign: 'middle' }}
                            />
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" id="phone"
                            value={userData[currentIndex]?.data[currentIndex]?.Homephone}
                            onChange={handleChange} />
                        <button
                            id="copyPhoneButton"
                            className="copy-button"
                            onClick={() => copyToClipboard('phone', 'copyPhoneButton')}
                        >
                            <span style={{ color: 'white' }}>Copy</span>
                            <img
                                src="/images/copy.svg"
                                alt="Copy"
                                style={{ verticalAlign: 'middle' }}
                            />
                        </button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="text" id="dob"
                            value={userData[currentIndex]?.data[currentIndex]?.Dateofbirth}

                            onChange={handleChange} />
                        <button
                            id="copydobButton"
                            className="copy-button"
                            onClick={() => copyToClipboard('dob', 'copydobButton')}
                        >
                            <span style={{ color: 'white' }}>Copy</span>
                            <img
                                src="/images/copy.svg"
                                alt="Copy"
                                style={{ verticalAlign: 'middle' }}
                            />
                        </button>

                    </div>

                    <div className="button">
                        {/* <button type="button" onClick={loadPreviousUserData}style={{ marginRight: '10px' }}>
                            Load Previous
                        </button> */}

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
