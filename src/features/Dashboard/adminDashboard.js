import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from '../Service/auth.service';

function AdminDashboard() {
    const [showPopup, setShowPopup] = useState(false);
    const [userId, setUserId] = useState('');
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        date_of_joining: ''
    });

    const openPopup = () => {
        setShowPopup(true);
    }

    const closePopup = () => {
        setShowPopup(false);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Check the console to see the form data
        closePopup();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleCreateUser = async () => {
        try {
            const response = await createUser(formData);
            const { user_id, generated_password } = response.data;

            // Show toast with success message
            toast.success('User created successfully!', {
                autoClose: 5000,
                hideProgressBar: true,
                position: toast.POSITION.TOP_RIGHT
            });

            // Show popup with user ID and password
            setShowPopup(true);
            setGeneratedPassword(generated_password);
            setUserId(user_id);
        } catch (error) {
            console.error(error.message);
            toast.error('Error creating user. Please try again later.', {
                autoClose: 5000,
                hideProgressBar: true,
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    const copyPassword = () => {
        const passwordField = document.getElementById('password');
        passwordField.select();
        document.execCommand('copy');
        toast.success('Password copied to clipboard!', {
            autoClose: 3000,
            hideProgressBar: true,
            position: toast.POSITION.TOP_RIGHT
        });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Admin Dashboard</h1>
            <button
                style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    fontSize: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '10px 20px'
                }}
                onClick={openPopup}
            >
                Add New User
            </button>

            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '5px',
                        position: 'relative'
                    }}>
                        <span
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                cursor: 'pointer',
                                fontSize: '20px'
                            }}
                            onClick={closePopup}
                        >
                            &times;
                        </span>
                        <h2>Add New User</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                required
                                style={{ width: 'calc(100% - 20px)', padding: '10px' }}
                            /><br />

                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                required
                                style={{ width: 'calc(100% - 20px)', padding: '10px' }}
                            /><br />

                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                style={{ width: 'calc(100% - 20px)', padding: '10px' }}
                            /><br />

                            <label htmlFor="date_of_joining">Date of Joining</label>
                            <input
                                type="date"
                                id="date_of_joining"
                                name="date_of_joining"
                                value={formData.date_of_joining}
                                onChange={handleInputChange}
                                required
                                style={{ width: 'calc(100% - 20px)', padding: '10px' }}
                            /><br />

                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 20px',
                                    cursor: 'pointer'
                                }}
                                onClick={handleCreateUser}
                            >
                                Create user
                            </button>


                        </form>
                        {/* <div>
                            User ID: {userId}<br />
                            Password: {generatedPassword}
                        </div>
                        <div>
                            <button onClick={copyPassword}>Copy Password</button>
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
