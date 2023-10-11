
import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { getAllData } from './Service/auth.service';

export const OperatorDetail = () => {
    const [data, setData] = useState([]);

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

    const containerStyle = {
        backgroundColor: '#f5f5f5',
        borderRadius: '7px',
        margin: '70px auto',
        width: '800px',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative'
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
        <div style={containerStyle}>
            <h2 style={{ marginBottom: '30px', color: 'black', textAlign: 'center' }}>Operator Detail</h2>
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
                            <td style={tdStyle}>{item.Status}</td>
                            <td style={tdStyle}>
                                <i className="fa fa-trash" style={deleteIconStyle}></i>
                                <i className="fa fa-file" style={fileIconStyle}></i>
                                <i className="fa fa-edit" style={editIconStyle}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};