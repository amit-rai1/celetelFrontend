
import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getUserList, { createUser } from '../Service/auth.service';
import Header from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';
import { deleteUser } from '../Service/auth.service';

const EmpList = () => {

  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    date_of_joining: '',
    Phone: ""
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
useEffect(() => {
    // Fetch user list when the component mounts
    getUserList()
        .then(response => {
            setUserList(response.data.data);
            console.log(response.data.data, "res52");
        })
        .catch(error => {
            console.error('Error fetching user list:', error);
        });
}, []);
const handleCreateUser = async () => {
    try {
        const response = await createUser(formData);
        console.log('Responsesssssswww:', response); // Add this line

        if (response.status) {
            const { user_id, generated_password } = response.result;

            // Show toast with success message
            toast.success('User created successfully!', {
                autoClose: 5000,
                hideProgressBar: true,
                position: toast.POSITION.TOP_RIGHT
            });
            setGeneratedPassword(response.result.password);
            setUserId(response.result._id);

            setShowPopup(true);
            setShowSuccessPopup(true)

            getUserList()
                .then(response => {
                    setUserList(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching user list:', error);
                });

        } else {
            throw new Error(response.message || 'Error creating user');
        }
    } catch (error) {
        console.error(error.message);
        toast.error(error.message || 'Error creating user. Please try again later.', {
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

const sendDetails = () => {
    // Implement the code to send user details here
    console.log('Sending user details...');
}

const handleDelete = async () => {
    console.log('Before deleteUser call');
    try {
        const selectedUsers = selectedCheckboxes.map(index => userList[index]);
        const userIdsToDelete = selectedUsers.map(user => user._id);
        console.log('Selected Users:', selectedUsers);
        console.log('User IDs to Delete:', userIdsToDelete);
        const response = await deleteUser(userIdsToDelete);

        console.log('Delete API Response:', response);

        if (response.status === 200) {

            setUserList(response.data); // Update userList with the new data
            console.log(response.data, "response.data.data")
            setSelectedCheckboxes([]);
            toast.success('Users deleted successfully!');
            setUserList(prevList => prevList.filter(user => !userIdsToDelete.includes(user._id)));

        } else {
            throw new Error(response.data.msg || 'Error deleting users');
        }
    } catch (error) {
        console.error('Error deleting users:', error);
        toast.error('Error deleting users. Please try again later.');
    }
};
  
  const handleCheckboxClick = (index) => {
    const updatedSelection = [...selectedCheckboxes];
    if (updatedSelection?.includes(index)) {
      updatedSelection.splice(updatedSelection.indexOf(index), 1);
    } else {
      updatedSelection.push(index);
    }
    setSelectedCheckboxes(updatedSelection);
    console.log('Updated Selection:', updatedSelection)
  };

  const handleSearch = () => {
    getUserList(searchTerm)
      .then(response => {
        setUserList(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  };

  useEffect(() => {
    handleSearch(); // Initial fetch without search term
  }, [searchTerm]);
  // console.log('Rendered User List:', userList);

  // const handleClearSearch = () => {
  //   setSearchTerm('');
  //   handleSearch(); // Trigger a search to get the full list when clearing the search term
  // };

  const handleKeyUp = (e) => {
    if (e.key === 'Backspace' && !searchTerm) {
      handleSearch(); // Trigger a search to get the full list when backspace is used to clear
    }
  };
  const containerStyles = {
    marginBottom: '2rem',
    padding: '0 1rem',
    marginLeft: '200px', // Adjusted left margin
  };

  const headingStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '20px 0 0',
  };



  const tableStyles = {
    borderCollapse: 'collapse',
    background: 'white',
    width: '100%',
  };

  const thStyles = {
    border: 'none', // Removed border
    padding: '0.8rem', // Adjusted padding
    background: '#f0f0f0',
  };

  const tdStyles = {
    border: 'none', // Removed border
    padding: '0.8rem', // Adjusted padding
    textAlign: 'center',
  };
  const searchBoxContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align items to the right
    marginBottom: '1rem', // Added margin at the bottom
  };

  const searchBoxStyles = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    // width: '150px', // Adjusted width
    width:'312px',
height:'29px',
    marginRight: '0.5rem', // Added margin to separate from the icon
  };

  const checkboxContainerStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  const checkboxLabelStyles = {
    marginLeft: '0.5rem',
  };

  return (
    <>
    <Header />
    <Sidebar />
    <div style={{ textAlign: 'center' }}>
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
                                    right: '150px', /* Adjusted right value */
                                    color: '#ffffff',
                                    fontSize: '16px',
                                    textAlign: 'center',
                                    boxSizing: 'border-box',
                                }}
                                className="add-new"
                                onClick={openPopup}
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
                                Add new
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
                                    right: '60px', /* Adjusted right value */
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>



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
                                        <label htmlFor="first_name">Phone No</label>
                                        <input
                                            type="text"
                                            id="Phone"
                                            name="Phone"
                                            value={formData.Phone}
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
                                {showSuccessPopup && (
                                    <div style={{ position: 'fixed', top: '50%', left: '50%', transform:
                                     'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', 
                                     borderRadius: '5px', maxWidth: '500px', width: '100%', textAlign: 'center', 
                                     boxSizing: 'border-box' }}>
                                        <div style={{ position: 'relative' }}>
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <div style={{ width: '100%', padding: '20px', textAlign: 'center' }} className="thank-you-pop">
                                                        <span onClick={() => setShowSuccessPopup(false)}>&times;</span>
                                                        <img src="http://goactionstations.co.uk/wp-content/uploads/2017/03/Green-Round-Tick.png" alt="" style={{ width: '76px', height: 'auto', margin: '0 auto', display: 'block', marginBottom: '25px' }} />
                                                        <h1 style={{ fontSize: '42px', marginBottom: '25px', color: '#5C5C5C' }}>Thank You!</h1>
                                                        <p style={{ fontSize: '20px', marginBottom: '27px', color: '#5C5C5C' }}>Your submission is received and we will contact you soon</p>
                                                        <h3 className="cupon-pop" style={{ fontSize: '25px', marginBottom: '40px', color: '#222', display: 'inline-block', textAlign: 'center', padding: '10px 20px', border: '2px dashed #222', clear: 'both', fontWeight: 'normal' }}>
                                                            Your Id: <span style={{ color: '#03A9F4' }}>{userId}</span>
                                                        </h3>
                                                        <h3 className="cupon-pop" style={{ fontSize: '25px', marginBottom: '40px', color: '#222', display: 'inline-block', textAlign: 'center', padding: '10px 20px', border: '2px dashed #222', clear: 'both', fontWeight: 'normal' }}>
                                                            Password: <span style={{ color: '#03A9F4' }}>{generatedPassword}</span>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    )
                    }
                </div >
    <div style={containerStyles}>
      <h2 style={headingStyles}>Employee List</h2>
       <div style={searchBoxContainerStyles}>
        <input 
          type="text" 
          placeholder="Search..." 
          style={searchBoxStyles} 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} // Update searchTerm on input change
          onKeyUp={handleKeyUp} // Handle key up events
        />
        <i 
          className="fa fa-search" 
          style={{ 
            fontSize: '1.2rem', 
            
            color: searchTerm ? 'blue' : '#ccc' // Conditionally set color
          }} 
          onClick={handleSearch} // Trigger search on icon click
        ></i>
        {/* {searchTerm && (
          <button onClick={handleClearSearch}>Clear</button>
        )} */}
      </div>
      <table className="table" style={tableStyles}>
        <thead>
          <tr>
            <th scope="col" style={{ ...thStyles, width: '10%' }}>No</th>
            <th scope="col" style={{ ...thStyles, width: '20%' }}>Name</th>
            <th scope="col" style={{ ...thStyles, width: '10%' }}>Employee ID</th>
            <th scope="col" style={{ ...thStyles, width: '15%' }}>Date of Joining</th>
            <th scope="col" style={{ ...thStyles, width: '10%' }}>Phone No</th>
            <th scope="col" style={{ ...thStyles, width: '10%' }}>Profile</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={user._id}>
              <td style={{ ...tdStyles, textAlign: 'center' }}>
                <div style={checkboxContainerStyles}>
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`customCheck${index}`}
                    checked={selectedCheckboxes.includes(index)}
                    onClick={() => handleCheckboxClick(index)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={`customCheck${index}`}
                    style={checkboxLabelStyles}
                  >
                    {index + 1}
                  </label>
                </div>
              </td>
              <td style={{tdStyles,}}>{`${user.first_name} ${user.last_name}`}</td>
              <td style={tdStyles}>{user._id}</td>
              <td style={tdStyles}>{user.date_of_joining}</td>
              <td style={tdStyles}>{user.Phone || 'N/A'}</td>
              <td style={{ ...tdStyles, textAlign: 'center' }}>View Profile</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}


export default EmpList;
