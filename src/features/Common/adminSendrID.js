import React, { useState, useEffect } from 'react';
// import { addSenderID, getSenderId } from './Service/auth.service';
import { addSenderID,getSenderId } from '../Service/auth.service';
import { Sidebaradmin } from './adminSidebar';
import Navbar from './Navbar';

const AdminSenderID = () => {
    const [senderID, setSenderID] = useState('');
    const [senderIDs, setSenderIDs] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const loadSenderIDs = async () => {
            try {
                const response = await getSenderId(page, limit);
                setSenderIDs(response.data);
            } catch (error) {
                console.error('Error fetching sender IDs:', error);
            }
        };

        loadSenderIDs();
    }, [page, limit]);

    const handleInputChange = (e) => {
        setSenderID(e.target.value);
    };

    const handleAddSenderID = async () => {
        try {
            const response = await addSenderID(senderID);
            setSenderIDs([...senderIDs, response.data]);
            setSenderID('');
        } catch (error) {
            console.error('Error adding sender ID:', error);
        }
    };
    const handleCopySenderID = (id) => {
        const senderToCopy = senderIDs.find(sender => sender._id === id);

        if (senderToCopy) {
            const senderIDToCopy = senderToCopy.SenderID;

            navigator.clipboard.writeText(senderIDToCopy)
                .then(() => {
                    alert(`Sender ID "${senderIDToCopy}" copied to clipboard!`);
                })
                .catch((error) => {
                    console.error('Error copying sender ID:', error);
                    alert('Failed to copy sender ID. Please try again.');
                });
        } else {
            alert('Sender ID not found.');
        }
    };

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    return (
        <>
        <Navbar/>
            <Sidebaradmin/>
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
                <h2>Add Sender ID</h2>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <input
                        type="text"
                        value={senderID}
                        onChange={handleInputChange}
                        placeholder="Enter Sender ID"
                        style={{
                            flex: 1,
                            padding: '8px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            marginRight: '8px',
                            width: '180px'  /* Adjusted width to make it medium */
                        }}
                    />

                    <button
                        onClick={handleAddSenderID}
                        style={{
                            padding: '8px 16px', fontSize: '14px', border: 'none', borderRadius: '4px',
                            backgroundColor: '#28a745', color: '#fff', cursor: 'pointer', width: '80px'
                        }}
                    >
                        Add
                    </button>


                </div>

                <h2>Sender IDs</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>Sender ID</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {senderIDs.map((sender) => (
                            <tr key={sender._id}>
                                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{sender.SenderID}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                                    <div onClick={() => handleCopySenderID(sender._id)} style={{ cursor: 'pointer' }}>
                                        <i className="fas fa-copy"></i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination (if needed) */}
                {/* <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            className={`pagination-button ${page === 1 && 'disabled'}`}
            onClick={handleLoadMore}
            disabled={page === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <span style={{ fontSize: '16px', margin: '0 10px' }}>Page {page}</span>
          <button
            className="pagination-button"
            onClick={handleLoadMore}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div> */}
            </div>
        </>
    );
};

export default AdminSenderID;
