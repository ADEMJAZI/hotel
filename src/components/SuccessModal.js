import React from 'react';
import { Modal } from 'react-bootstrap';

const SuccessModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Dialog className="modal-confirm">
        <Modal.Header closeButton>
          <div className="icon-box">
            <i className="material-icons">&#xE876;</i>
          </div>
          <Modal.Title>Awesome!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">Your booking has been confirmed. Check your email for details.</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success btn-block" onClick={onHide}>
            OK
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default SuccessModal;
