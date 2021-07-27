import React from 'react';
import Galeria from './Galeria.js'

function VerConsulta(props) {
    return (
        <div className="VerConsulta">
            <div className="Info">                    

                <div className="contenedor"><label>Descripcion: </label><p>{props.consulta.Descripcion}</p></div>
                <div className="contenedor"><label>Tipo: </label><span>{props.consulta.Tipo}</span></div>

                <div className="contenedor"><label>Completada: </label><input checked={props.consulta.Completada} readOnly type="checkbox"/></div>
                <div className="contenedor"><label>Costo: </label><span>{props.consulta.Costo}</span></div>
                </div>

                <div className="SubirArchivo">

                <div className="GaleriaArchivos">
                    <Galeria galeria={props.listaArchivos}/>
                </div>

            </div>
        </div>
    )
}

export default VerConsulta;