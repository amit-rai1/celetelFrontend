
import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { getAllData } from './Service/auth.service';
import Navbar from './Common/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SimDataModal from './Common/simModel';
import { Sidebaradmin } from './Common/adminSidebar';
import Sidebar from './Common/Sidebar';
export const OperatorDetail = () => {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    // const [deletedIds, setDeletedIds] = useState([]);


    const handleAddClick = (index) => {
        console.log('Add clicked!');
        setSelectedRow(index);
    };

    function hashLastFiveDigits(simNumber) {
        const lastFiveDigits = simNumber.slice(5);
        const hashedLastFiveDigits = lastFiveDigits.replace(/\d/g, '*');
        return simNumber.slice(0, 5) + hashedLastFiveDigits;
      }

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
        </>
    );
};