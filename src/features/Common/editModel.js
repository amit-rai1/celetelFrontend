import React from 'react';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components
import EditSimDataForm from '../EditSimDataForm';

const EditDataModal = ({ show, handleClose,id }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Sim Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <EditSimDataForm id={id} handleClose={handleClose } /> 
                       </Modal.Body>
        </Modal>
    );
};

export default EditDataModal;
