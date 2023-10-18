import React, { useState,useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { addSimData,getAllData } from './Service/auth.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SimDataForm = () => {
    const [simData, setSimData] = useState({
        MSISDN: '',
        SIM_Number: '',
        // IMSI_Number: '',
        Circle: '',
        Operators:"",
        Status: 'Active'
    });
const [data , setData]= useState([]);
    const [selectedCircle, setSelectedCircle] = useState(""); // Initialize with an empty string or the default value you prefer

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSimData({ ...simData, [name]: value });
    };
    useEffect(() => {
        // Fetch user list when the component mounts
        getAllData()
            .then(response => {
                setData(response.data);
                console.log(response.data, "res52");
            })
            .catch(error => {
                console.error('Error fetching user list:', error);
            });
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addSimData(simData);
            console.log(response); // Handle the response as needed
            toast.success('Data added successfully!');
            console.log("Before setData");
            getAllData()
                .then(response => {
                    setData(response.data);
                    console.log(response.data);
                    console.log("After setData");
                })
        } catch (error) {
            console.error(error.message);
            toast.error('An error occurred while adding data.');
        }
    };
    
    
    const handleCircleChange = (e) => {
        const selectedValue = e.target.value;
        setSimData({ ...simData, Circle: selectedValue }); // Update the Circle property in simData
    };
    const handleStatusChange = (e) => {
        const selectedValue = e.target.value;
        setSimData({ ...simData, Status: selectedValue });
    };
    
    return (
        <div className="container" style={containerStyle}>

            <div className="mb-3">
                <label htmlFor="simNumber" className="form-label">Sim Number</label>
                <input
                    type="text"
                    className="form-control"
                    id="simNumber"
                    placeholder="Type Number"
                    name="MSISDN"
                    onChange={handleChange} // Add this line
                />

            </div>
            <div className="mb-3">
                <label htmlFor="msidnNumber" className="form-label">MSIDN Number</label>
                <input
                    type="text"
                    className="form-control"
                    id="msidnNumber"
                    placeholder="MSDIN Number"
                    name="SIM_Number"
                    onChange={handleChange} // Add this line
                />
            </div>
            <div className="mb-3">
                <label htmlFor="msidnNumber" className="form-label">Operator</label>
                <input
                    type="text"
                    className="form-control"
                    id="Operators"
                    placeholder="Operators"
                    name="Operators"
                    onChange={handleChange} // Add this line
                />
            </div>
            <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                value={simData.Circle}
                name="Circle" // Make sure to have this
                onChange={handleChange}
            >
                <option defaultValue>Circle</option>
                <option value="Uttar Pradesh West">Uttar Pradesh West</option>
                <option value="Bihar">Bihar</option>
                <option value="Delhi">Delhi</option>
                <option value="Punjab">Punjab</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
            </select>
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="Status" // Added name attribute
                    id="inlineRadio1"
                    value="Active"
                    checked={simData.Status === 'Active'} // Set checked if Status is 'Active'
                    onChange={handleChange} // Add onChange event handler
                />
                <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
            </div>
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="Status" // Added name attribute
                    id="inlineRadio2"
                    value="Inactive"
                    checked={simData.Status === 'Inactive'} // Set checked if Status is 'Inactive'
                    onChange={handleChange} // Add onChange event handler
                />
                <label className="form-check-label" htmlFor="inlineRadio2">Inactive</label>
            </div>

            <div>
                <button
                    className="btn btn-dark"
                    style={buttonStyle}
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

const containerStyle = {
    width: '400px',
    height: 'auto',
    marginTop: '50px',
    borderRadius: '10px',
    backgroundColor: 'rgba(152, 199, 144, 0.7)',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
};

const buttonStyle = {
    marginTop: '30px',
    borderRadius: '10px',
    width: '120px'
};

export default SimDataForm;
