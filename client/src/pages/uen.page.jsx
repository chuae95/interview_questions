import React, { useState } from 'react';

function UenPage() {

    const [uenNumber, setUenNumber] = useState("");

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
        console.log(result)

    }

    function updateUenNumber(e) {
        setUenNumber(e.target.value);
    }
    
    return (
        <div>
            UEN validator

            <div>
                <input value={uenNumber} onChange={(e) => updateUenNumber(e)} />
            </div>

            <div>
                <button onClick={() => triggerValidation(uenNumber)}>Send for validation</button>
            </div>

        </div>
    )

}

export default UenPage;