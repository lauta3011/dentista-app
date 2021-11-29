import React from 'react';
import './Flecha.css';
import flecha from './images/flecha.png';

function Flecha(props) {
    return (
        <div className="Flecha" onClick={() => props.volver()}>
            <img src={flecha} />
        </div>
    )
}

export default Flecha;