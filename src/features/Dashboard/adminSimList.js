
import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { getAllData, deleteUser, uploadFile } from '../Service/auth.service';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TablePagination from '@mui/material/TablePagination';

import SimDataModal from '../Common/simModel';
import Navbar from '../Common/Navbar';
import { Sidebaradmin } from '../Common/adminSidebar';
import EditDataModal from '../Common/editModel';
import EditSimDataForm from '../EditSimDataForm';

import FileUploadModal from '../FileUploadModal';
import ReactPaginate from 'react-paginate';
// import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
export const AdminList = () => {
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedEditId, setSelectedEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showFileUploadModal, setShowFileUploadModal] = useState(false); // Add state for file upload modal

    const [circleFilter, setCircleFilter] = useState('');

    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [stats, setStats] = useState(null);

    // const { isLoggedIn } = useAuth();
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         // Redirect to login page if not authenticated
    //         navigate('/login'); // Use navigate to redirect
    //     }
    // }, [isLoggedIn, navigate]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    console.log(paginatedData, "ap")
    // const [deletedIds, setDeletedIds] = useState([]);


    const handleAddClick = (index) => {
        console.log('Add clicked!');
        setSelectedRow(index);
    };
    const handleEditClick = (id) => {
        setSelectedEditId(id);
        setShowModal(true);
    };




    const handleClose = () => {
        setSelectedEditId(null);
        setShowModal(false);
        getAllData()
            .then(response => {
                setData(response.data);
                console.log(response.data);
                console.log("After setData");
            })

    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllData({
                    Circle: circleFilter,
                    Status: statusFilter,
                    page: page + 1, // Adjust page value
                    limit: rowsPerPage, // Adjust limit based on rowsPerPage
                });
                console.log(response, "line80"); // Add this line

                setData(response.data);
                console.log(response.data, "data")
                setTotalRows(response.totalItems); // Change this line
                console.log(totalRows, "totalRows")
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [circleFilter, statusFilter, page, rowsPerPage]);

    const handleDelete = async (id) => {
        console.log(id, "id")
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
        // setSelectedEditId(null);
        getAllData()
            .then(response => {
                setData(response.data);
                console.log(response.data);
                console.log("After setData");
            })
    };

    const handleUpload = async (file) => {
        try {
            const response = await uploadFile(file);

            if (response.success) {
                alert(response.msg);
                handleClose();
                getAllData();
            } else {
                alert(response.msg);
            }
        } catch (error) {
            console.error(error);
            alert('Error uploading file');
        }
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
    console.log(selectedEditId);

    console.log("page:", page);
    console.log("rowsPerPage:", rowsPerPage);
    console.log("totalRows:", totalRows);

    return (
        <>
            <Navbar />
            <Sidebaradmin />


            <div style={containerStyle}>
                <div style={{ display: 'flex' }}>
                    <div style={{ marginRight: '10px' }}>
                        <label>Filter Status:</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{
                                marginLeft: '5px',
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px'
                            }}
                        >
                            <option value="">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label>Filter Circle:</label>
                        <select
                            value={circleFilter}
                            onChange={(e) => setCircleFilter(e.target.value)}
                            style={{
                                marginLeft: '5px',
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px'
                            }}
                        >
                            <option value="">All</option>
                            <option value="Uttar Pradesh West">Uttar Pradesh West</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                        </select>
                    </div>
                </div>

                {/* <h2 style={{ marginBottom: '', color: 'black', textAlign: 'center',margin: ' auto' }}>Operator Detail</h2> */}
                <a href="#" style={buttonStyle} onClick={() => setShowFileUploadModal(true)}>Upload File</a>                <table style={tableStyle}>
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
                                    <i className="fa fa-edit" style={editIconStyle} onClick={() => { console.log(item._id, "iditem"); handleEditClick(item._id) }}></i>

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
            {selectedEditId !== null && (
                <div>
                    <EditDataModal show={showModal} handleClose={handleClose} id={selectedEditId} />
                </div>
            )}
            {showFileUploadModal && (
                <FileUploadModal
                    handleClose={() => setShowFileUploadModal(false)}
                    handleFileUpload={handleUpload} // Assuming you have a function for handling file uploads
                />
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <TablePagination
                    component="div"
                    count={totalRows}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{
                        backgroundColor: 'white', // Background color
                        borderRadius: '5px', // Border radius
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow
                    }}
                    backIconButtonProps={{
                        style: {
                            color: 'black', // Color of the back button
                        },
                    }}
                    nextIconButtonProps={{
                        style: {
                            color: 'black', // Color of the next button
                        },
                    }}
                    labelRowsPerPage={<span style={{ color: 'black' }}>Rows per page</span>} // Label style
                    rowsPerPageOptions={[10, 25, 50, 100]} // Dropdown options style
                    SelectProps={{
                        style: {
                            color: 'black', // Color of the dropdown arrow
                        },
                    }}
                />
            </div>
        </>
    );
};