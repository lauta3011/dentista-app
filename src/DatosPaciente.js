import { React } from 'react';
import './DatosPaciente.css';
import userImage from './images/Portrait_Placeholder.png';

function DatosPaciente(props) {
    console.log(props.paciente.Foto)
    return (
        <div className="DatosPaciente">
            <div className="Principal">
                <img height='150px' width='150px' src={userImage} alt='imagen de perfil de paciente'/>
                <div>
                    <h3>{props.paciente.Nombre}</h3>
                    <span>CI: {props.paciente.Cedula}</span>
                    <span>Telefono: {props.paciente.Telefono}</span>
                </div>
            </div>
            
            <div className="Informacion">
                <h3>Datos importantes</h3>
                <span>{props.paciente.Otros ? props.paciente.Otros : 'No hay datos importantes para este paciente' }</span>
            </div>

        </div>
    )
}

export default DatosPaciente;