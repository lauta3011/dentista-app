import { React, useEffect, useState } from 'react';

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
        </div>
    )
}

export default VerConsulta;