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
            if (response.statusCode === 200) {
                // Show toast with success message
                toast.success('User created successfully!', {
                    autoClose: 5000,
                    hideProgressBar: true,
                    position: toast.POSITION.TOP_RIGHT
                });
            }
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
    const containerStyle = {
        padding: '16px'
    };
    return (

        <div style={{ textAlign: 'center' }}>
            <h1>Admin Dashboard</h1>

            <button
                style={{
                    background: '#2e2e2e',
                    borderRadius: '12px',
                    padding: '17px 16px',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    width: '180px',
                    position: 'absolute',
                    top: '105px',
                    right: '20px',
                    color: '#ffffff',
                    fontSize: '20px',
                    textAlign: 'center',
                }}
                onClick={openPopup}
            >
                Add New User
            </button>

            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '5px',
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center',
                    boxSizing: 'border-box',
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
                        <form
                            onSubmit={handleFormSubmit}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '40px'
                            }}
                        >
                            <div className="container" style={containerStyle}>
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
                                        background: '#2e2e2e',
                                        borderRadius: '8px',
                                        padding: '10px 20px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '10px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        width: '290px',
                                        position: 'relative',
                                        color: '#ffffff',
                                        textAlign: 'center',
                                        font: '500 18px "Poppins", sans-serif',
                                        position: 'relative',
                                        width: '148px',
                                        display: 'flex',
                                        align: 'items: center',
                                        margin: 'auto'
                                    }}
                                    onClick={handleCreateUser}
                                >
                                    Create user
                                </button>
                            </div>

                        </form>
                        {/* <div>
                            User ID: {userId}<br />
                            Password: {generatedPassword}
                        </div> */}
                        {/* <div>
                            <button onClick={copyPassword}>Copy Password</button>
                        </div> */}
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default AdminDashboard;
