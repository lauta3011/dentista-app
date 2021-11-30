import React from 'react';
import Flecha from './Flecha.js';
import './MiniDatosPaciente.css';
import userImage from './images/Portrait_Placeholder.png';

function MiniDatosPaciente(props) {
    return (
        <div className="MiniDatosPaciente">
            <img className="userImage" src={userImage}/>
            <Flecha volver={() => props.volver()}/>
            <div className="infoContainer">
                <h4>{props.nombre}</h4>
                <span>{props.otros}</span>
            </div> 
        </div>
    )
}

export default MiniDatosPaciente;