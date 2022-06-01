import React, { useEffect, useState } from 'react';
import './uen.styles.scss';
import LinkButton from '../../components/linkButton/linkButton.component';

function UenPage() {

    const [uenNumber, setUenNumber] = useState("");
    const [data, setData] = useState(null);
    const [maximise, setMaximise] = useState(true);

    const links = [
        {
          url: '/',
          display: 'Back to Home Page'
        }, 
        {
          url: '/weather',
          display: 'Use Weather Forecast'
        }
      ];

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

    }

    function updateUenNumber(e) {
        setUenNumber(e.target.value);
    }
    
    return (
        <div id='uenPage' className={`${maximise ? `maximise` : `minimise` }`} >

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
                                    <div>Valid UEN number provided</div>
                                    <div>{data.type}</div>
                                </>
                                :
                                <>
                                    <div>Invalid UEN number provided.</div>
                                    <div>{data.type}</div>
                                </>
                            
                        
                        : null

                        }
                    </div>
                </div>

            </div>

            <div>

                {maximise ? 

                    <>

                        {
                        links.map(link => (
                            <LinkButton link={link} />
                        ))

                        }

                        <div>
                            <button onClick={() => setMaximise(false)}>X</button>
                        </div>

                    </>

                    : 

                    <div>
                    <button onClick={() => setMaximise(true)}>View Sidebar</button>
                    </div>
                    
                }
            </div>


        </div>
    )

}

export default UenPage;