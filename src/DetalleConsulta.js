import { React, useState, useEffect } from 'react';
import VerConsulta from './VerConsulta.js';
import EditarConsulta from './EditarConsulta.js';
import './DetalleConsulta.css';

function DetalleConsulta(props) { 
    const [editar, setEditar] = useState(false);
    const [editarLabel, setEditarLabel] = useState('Editar');
    const [consulta, setConsulta] = useState(props.consulta);

    const guardarCambios = async(cambios) => {
        await window.api.modifyConsulta({cambios : cambios});
        props.handleActualizar();
        props.handleCerrarModal();
    }    



    let informacion;
    
    if(editar){
        informacion = <EditarConsulta handleCerrar={() => { props.handleCerrarModal(); setEditar(false); setConsulta({}); }} handleGuardarCambios={(cambios) => { guardarCambios(cambios); }} listaArchivos={props.galeria} consulta={consulta}/>;        
    }else{
        informacion = <VerConsulta listaArchivos={props.galeria} consulta={consulta}/>;
    }

    return (              
        <div style={{display:props.mostrar}} className="Modal">
            <div onClick={() => { props.handleCerrarModal(); setEditar(false); setConsulta({})}} className="FondoModal"></div>

            <div className="DetalleConsulta">
                
                <div className="HeaderDetalle">
                    <h2>{props.consulta.Nombre}</h2>

                    <div style={{paddingTop:'10px',marginLeft:'15px'}}>
                        <div className="contenedor"><span>{props.consulta.Fecha} </span></div>
                        <div className="contenedor"><span>{props.consulta.Hora}</span></div>    
                    </div>

                    <input onClick={() => {props.handleEliminarConsutla(props.consulta.Identificador)}} type="button" value="Eliminar" className="ActionButton"/>
                    <input onClick={() => { if(editar){setEditar(false); setEditarLabel('Editar')}else{setEditar(true); setEditarLabel('Cancelar')} }} type="button" value={editarLabel} className="ActionButton"/>
                </div>


                <div className="InfoConsulta">

                    {informacion}

                </div>
            </div>
        </div>  
    );
}
 
export default DetalleConsulta;