import React from 'react';

const FileUploadModal = ({ isOpen, onClose, onUpload }) => {
  return (
    <div style={{ display: isOpen ? 'flex' : 'none' }} className="file-upload-modal">
      <div style={modalContentStyle} className="modal-content">
        <h2>Upload Files</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={onUpload}
          style={fileInputStyle}
        />
        <button style={uploadButtonStyle} onClick={onUpload}>Upload</button>
        <button style={closeButtonStyle} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const modalContentStyle = {
  background: '#ffffff',
  borderRadius: '10px',
  padding: '28px 34px 28px 34px',
  width: '912px',
  height: '868px',
  position: 'relative',
  overflow: 'hidden',
};

const fileInputStyle = {
  display: 'block',
  marginBottom: '1rem',
  fontSize: '1rem',
  padding: '0.5rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
  boxSizing: 'border-box',
};

const uploadButtonStyle = {
  background: '#2e2e2e',
  borderRadius: '12px',
  padding: '8px 10px',
  color: '#ffffff',
  fontSize: '16px',
  textAlign: 'center',
  boxSizing: 'border-box',
  marginBottom: '1rem',
};

const closeButtonStyle = {
  background: '#2e2e2e',
  borderRadius: '12px',
  padding: '8px 10px',
  color: '#ffffff',
  fontSize: '16px',
  textAlign: 'center',
  boxSizing: 'border-box',
};

export default FileUploadModal;
