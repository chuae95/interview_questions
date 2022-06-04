import React, { useEffect } from 'react';
import './dropDown.styles.scss';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function DropDown({ selected, options, updateField }) {

    useEffect(() => {

    }, [ selected ])

    return (

        <div id = "dropdownBar">
            <div id = "dropdownBarLabel">
                Filter : 
            </div>

            <div>
                <DropdownButton onSelect={updateField} id="dropdown-basic-button filterToggle" title={`${selected === '' ? '---' : selected}`}>

                    {
                        options.map(option => (
                            <Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
                        ))
                    }
                    <Dropdown.Item eventKey=''>---</Dropdown.Item>
                </DropdownButton>

            </div>
            
        </div>
      
    )

}

export default DropDown;

