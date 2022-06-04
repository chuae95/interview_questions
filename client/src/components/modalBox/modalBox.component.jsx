import React from 'react';
import Modal from "react-bootstrap/Modal";
import './modalBox.styles.scss';

function ModalBox({ data, isOpen, hideModal }) {

    return (
        <>
            <Modal centered show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    {
                        data.status ? 
                            <Modal.Title id='modalTitleValid'>Valid UEN number format provided!</Modal.Title>
                            :
                            <Modal.Title id='modalTitleInvalid'>Invalid UEN number format provided...</Modal.Title>
                    }
                    
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {data.description}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={hideModal}>Cancel</button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalBox;