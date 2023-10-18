import React, { useState, useEffect } from 'react';
import { getDataById, updateData,getAllData } from './Service/auth.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditSimDataForm = ({ id, handleClose }) => {
    const [allData, setAllData] = useState([]);
    const [simData, setSimData] = useState({
        MSISDN: '',
        SIM_Number: '',
        Circle: '',
        Operators: '',
        Status: 'Active'
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDataById(id);
                if (response) {
                    setSimData(response);
                }
            } catch (error) {
                console.error(error.message);
            }
        };
    
        if (id) {
            fetchData();
        }
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSimData({ ...simData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateData(id, simData);
            console.log(response);
            toast.success('Sim Data updated successfully!');
            handleClose();
            getAllData();
    
            const updatedData = await getAllData();
            console.log(updatedData); // Check if this logs the updated data
            setAllData(updatedData);
        
        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <div className="container" style={containerStyle}>
            <div className="mb-3">
                <label htmlFor="SIM_Number" className="form-label">Sim Number</label>
                <input
                    type="text"
                    className="form-control"
                    id="SIM_Number"
                    placeholder="Type Number"
                    name="SIM_Number"
                    value={simData?.SIM_Number || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="MSISDN" className="form-label">MSISDN Number</label>
                <input
                    type="text"
                    className="form-control"
                    id="MSISDN"
                    placeholder="MSISDN Number"
                    name="MSISDN"
                    value={simData?.MSISDN || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="Operators" className="form-label">Operator</label>
                <input
                    type="text"
                    className="form-control"
                    id="Operators"
                    placeholder="Operators"
                    name="Operators"
                    value={simData?.Operators || ''}
                    onChange={handleChange}
                />
            </div>
            <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                value={simData?.Circle || ''}
                name="Circle"
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
                    name="Status"
                    id="Active"
                    value="Active"
                    checked={simData?.Status === 'Active'}
                    onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="active">Active</label>
            </div>
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="Status"
                    id="inactive"
                    value="Inactive"
                    checked={simData?.Status === 'Inactive'}
                    onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="inactive">Inactive</label>
            </div>
            <div>
                <button
                    className="btn btn-dark"
                    style={buttonStyle}
                    type="button"
                    onClick={handleUpdate}
                >
                    update
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

export default EditSimDataForm;
