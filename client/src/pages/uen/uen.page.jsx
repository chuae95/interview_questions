import React, { useEffect, useState } from 'react';
import './uen.styles.scss';
import Modal from "react-bootstrap/Modal";

function UenPage() {

    const [uenNumber, setUenNumber] = useState("");
    const [data, setData] = useState(null);
    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {

    }, [])

    async function triggerValidation(target) {
        let response = await fetch('/uenValidation', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            'body': JSON.stringify({
                value: target
            })
        })

        let result = await response.json();

        setData(result);
        setIsOpen(true)

    }

    function updateUenNumber(e) {
        setUenNumber(e.target.value);
    }

    function hideModal() {
        setIsOpen(false);
    }
    
    return (
        <div id='uenPage'>

            <div id='uenPageValidatorBox'>

                <div className='validatorBoxComponent' id = 'uenPageValidatorTitle'>
                    UEN validator
                </div>

                <div className='validatorBoxComponent' id='uenPageValidatorInputBox'>
                    <input id = 'uenPageValidatorInput' value={uenNumber} onChange={(e) => updateUenNumber(e)} />
                </div>

                <div className='validatorBoxComponent' id='uenPageValidatorButtonBox'>
                    <button id='uenPageValidatorButton' onClick={() => triggerValidation(uenNumber)}>Send for validation</button>
                </div>

                <div>
                    <div>
                        {data ? 
                        
                            data.status ? 
                                <>
                                    <Modal show={isOpen} onHide={hideModal}>
                                        <Modal.Header>
                                            <Modal.Title>Valid UEN number format provided!</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>{data.type}</Modal.Body>
                                        <Modal.Footer>
                                            <button onClick={hideModal}>Cancel</button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                                :
                                <>
                                    <Modal show={isOpen} onHide={hideModal}>
                                        <Modal.Header>
                                            <Modal.Title>Invalid UEN number format provided...</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>{data.type}</Modal.Body>
                                        <Modal.Footer>
                                            <button onClick={hideModal}>Cancel</button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            
                        
                        : null

                        }
                    </div>
                </div>

            </div>

        </div>
    )

}

export default UenPage;