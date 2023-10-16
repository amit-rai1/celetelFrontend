
import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { getAllData } from './Service/auth.service';
import Navbar from './Common/Navbar';
import Sidebar from './Common/Sidebar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { deleteUser } from './Service/auth.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SimDataModal from './Common/simModel';

export const OperatorDetail = () => {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    // const [deletedIds, setDeletedIds] = useState([]);


    const handleAddClick = (index) => {
        console.log('Add clicked!');
        setSelectedRow(index);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllData();
                setData(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        console.log(id,"id")
        try {
            const response = await deleteUser([id]); // Assuming deleteUser expects an array of ids
            if (response.status === 200) {
                toast.success('Data deleted successfully!');
                const updatedData = data.filter(item => item._id !== id);
                setData(updatedData);
            } else {
                throw new Error(response.message || 'Error deleting data');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Error deleting data. Please try again later.');
        }
    };
    
    const handleCloseModal = () => {
        setSelectedRow(null);
        getAllData()
            .then(response => {
                setData(response.data);
                console.log(response.data);
                console.log("After setData");
            })
    };

    const containerStyle = {
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        margin: ' auto', // Adjusted margin
        marginBottom: "20px",
        width: '1150px',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        marginRight: '10px', // Added marginLeft to shift more right
    };

    const buttonStyle = {
        backgroundColor: 'black',
        color: 'white',
        display: 'block',
        float: 'right',  // Adjusted to float right
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse'
    };

    const tableHeadStyle = {
        backgroundColor: '#343a40',
        color: 'white'
    };

    const thStyle = {
        padding: '12px 15px'
    };

    const tdStyle = {
        padding: '10px 15px',
        textAlign: 'center',
        borderBottom: '1px solid #ddd'
    };

    const fileIconStyle = {
        cursor: 'pointer',
        color: 'black',
        marginRight: '10px' // Add margin to the right of the file icon
    };

    const deleteIconStyle = {
        cursor: 'pointer',
        marginRight: '10px',
        color: 'black'
    };

    const editIconStyle = {
        cursor: 'pointer',
        color: 'black',
        marginRight: '10px' // Add margin to the right of the edit icon
    };
    return (
        <>
            <Navbar />
            <Sidebar />
            <div style={containerStyle}>
                {/* <h2 style={{ marginBottom: '', color: 'black', textAlign: 'center',margin: ' auto' }}>Operator Detail</h2> */}
                <a href="#" style={buttonStyle}>Upload File</a>
                <table style={tableStyle}>
                    {/* Table Header */}
                    <thead style={tableHeadStyle}>
                        <tr>
                            <th style={thStyle}><input className="checkbox-input" type="checkbox" /></th>
                            <th style={thStyle}>NO</th>
                            <th style={thStyle}>MSISDN</th>
                            <th style={thStyle}>SIM Number</th>
                            <th style={thStyle}>Circle Code</th>
                            <th style={thStyle}>Operator</th>

                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td style={tdStyle}><input type="checkbox" className="checkbox" value={index + 1} /></td>
                                <td style={tdStyle}>{index + 1}</td>
                                <td style={tdStyle}>{item.MSISDN}</td>
                                <td style={tdStyle}>{item.SIM_Number}</td>
                                <td style={tdStyle}>{item.Circle}</td>
                                <td style={tdStyle}>{item.Operators}</td>

                                <td style={tdStyle}>{item.Status}</td>
                                <td style={tdStyle}>
                                    <i className="fa fa-plus" style={fileIconStyle} onClick={handleAddClick}></i>
                                    <i className="fa fa-edit" style={editIconStyle}></i>
                                    <i className="fa fa-trash" style={deleteIconStyle} onClick={() => handleDelete(item._id)}
                                    ></i>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedRow !== null &&
                <SimDataModal show={true} handleClose={handleCloseModal} />
            }
        </>
    );
};