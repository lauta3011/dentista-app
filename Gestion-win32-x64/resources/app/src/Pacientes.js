import { React } from 'react';
import './Pacientes.css';

function Pacientes(props) {
    if(props.listaPacientes.length > 0){
        return (
            <div className="ListaPacientes">
                {props.listaPacientes.map((p, index) => (
                    <div onClick={() => props.seleccionarPaciente(p)} key={index} className="Paciente">
                        <span>{p.Nombre}</span> | <span>{p.Cedula}</span>
                    </div>
                ))}
            </div>
        )
    }else{ 
        return (
            <div>
                <span>No hay pacientes.</span>
            </div>
        )
    }
}

export default Pacientes;