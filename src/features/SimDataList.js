
import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { getAllData } from './Service/auth.service';
import Navbar from './Common/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TablePagination from '@mui/material/TablePagination';

import SimDataModal from './Common/simModel';
import { Sidebaradmin } from './Common/adminSidebar';
import Sidebar from './Common/Sidebar';
export const OperatorDetail = () => {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    // const [deletedIds, setDeletedIds] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [circleFilter, setCircleFilter] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    console.log(paginatedData, "ap")

    const handleAddClick = (index) => {
        console.log('Add clicked!');
        setSelectedRow(index);
    };

    function hashLastFiveDigits(simNumber) {
        const numDigitsToHash = simNumber.length - 5; // Calculate the number of digits to hash
        const hashedDigits = '*'.repeat(numDigitsToHash); // Generate the hash string
        return hashedDigits + simNumber.slice(-5); // Concatenate the hash and last five digits
    }
    
    

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await getAllData();
    //             setData(response.data);
    //         } catch (error) {
    //             console.error(error.message);
    //         }
    //     };

    //     fetchData();
    // }, []);

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

   
    return (
        <>
           <Navbar/>
           <Sidebar/>
            <div style={containerStyle}> 
                <div style={{ display: 'flex' ,marginBottom:"10px"}}>
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
                            {/* <th style={thStyle}>Action</th> */}
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td style={tdStyle}><input type="checkbox" className="checkbox" value={index + 1} /></td>
                                <td style={tdStyle}>{index + 1}</td>
                                <td style={tdStyle}>{item.MSISDN}</td>
                                <td style={tdStyle}>{hashLastFiveDigits(item.SIM_Number)}</td>
                                <td style={tdStyle}>{item.Circle}</td>
                                <td style={tdStyle}>{item.Operators}</td>

                                <td style={tdStyle}>{item.Status}</td>
                              

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedRow !== null &&
                <SimDataModal show={true} handleClose={handleCloseModal} />
            }
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