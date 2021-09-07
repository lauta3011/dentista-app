import { React, useEffect } from 'react';
import Galeria from './Galeria.js';
function VerConsulta(props) {

    useEffect(() => {

    }, [props.consulta])

    return (
        <div className="VerConsulta">
            <div className="Info">                    

                <div className="contenedor"><label>Descripcion: </label><p onClick={() => props.handleEditar()} >{props.consulta.Descripcion}</p></div>
                <div className="contenedor"><label>Tipo: </label><span onClick={() => props.handleEditar()}>{props.consulta.Tipo}</span></div>

                <div className="contenedor"><label>Completada: </label><input onClick={() => props.handleEditar()} checked={props.consulta.Completada} readOnly type="checkbox"/></div>
                <div className="contenedor"><label>Costo: </label><span onClick={() => props.handleEditar()}>{props.consulta.Costo}</span></div>
            </div>

            <div className="SubirArchivo">
                <div className="GaleriaArchivos">
                        <Galeria handleActualizar={() => props.actualizarImagenes()} galeria={props.listaArchivos}/>
                </div>
            </div>
        </div>
    )
}

export default VerConsulta;