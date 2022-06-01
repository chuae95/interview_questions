import React from "react";
import './linkButton.styles.scss';
import { Link } from 'react-router-dom';

function LinkButton({link}) {

    return (
        <div>
            <Link to={link.url}>
                <button className='linkButtons'>
                    {link.display}
                </button>
            </Link>
        </div>
    )

}

export default LinkButton;