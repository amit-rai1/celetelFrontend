import React from 'react';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components
import SimDataForm from '../SimData';

const SimDataModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sim Data Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SimDataForm/>
      </Modal.Body>
    </Modal>
  );
};

export default SimDataModal;
