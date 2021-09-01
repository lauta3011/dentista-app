import { React, useState, useEffect } from 'react';
import VerConsulta from './VerConsulta.js';
import EditarConsulta from './EditarConsulta.js';
import Galeria from './Galeria.js'

import './DetalleConsulta.css';

function DetalleConsulta(props) { 
    const [editar, setEditar] = useState(false);
    const [consulta, setConsulta] = useState(props.consulta);
    const [archivos, setArchivos] = useState('vacio');

    useEffect(() => {        
        traerArchivos(props.consulta.Identificador);
        props.handleActualizar()
    }, [consulta, editar])

    const traerArchivos = async(identificador) => {
        const lista = await window.api.getArchivos({ identificador: identificador});
        let listaArchivos = [];
        
        if(lista !== 'vacio'){
            lista.map(a => (
                listaArchivos.push(a)
                ));
        }else {
            listaArchivos = lista;
        }
        setArchivos(listaArchivos);
    }

    const guardarCambios = async(cambios) => {
        await window.api.modifyConsulta({cambios : cambios});
        setConsulta(cambios)
    }    

    const editarConsulta = () => {
        setEditar(!editar)
    }
    
    let informacion;
    
    if(editar){
        informacion = <EditarConsulta actualizarImagenes={() => traerArchivos(consulta.Identificador)} handleCancelarEditar={() => setEditar(!editar)} listaArchivos={archivos} consulta={consulta} handleGuardarCambios={(cambios) => { setEditar(false); guardarCambios(cambios); }} handleCerrar={() => { props.handleCerrarModal(); setEditar(false); }} />;        
    }else{
        informacion = <VerConsulta actualizarImagenes={() => traerArchivos(consulta.Identificador)} handleEditar={() => editarConsulta()} listaArchivos={archivos} consulta={consulta}/>;
    }

    return (              
        <div className="Modal">
            <div onClick={() => { props.handleCerrarModal(); setEditar(false); setConsulta({})}} className="FondoModal"></div>

            <div className="DetalleConsulta">
                
                <div className="HeaderDetalle">
                    <h2>{props.consulta.Nombre}</h2>

                    <div style={{paddingTop:'10px',marginLeft:'15px'}}>
                        <div className="contenedor"><span>{props.consulta.Fecha} </span></div>
                        <div className="contenedor"><span>{props.consulta.Hora}</span></div>    
                    </div>

                    <input onClick={() => {props.handleEliminarConsutla(props.consulta.Identificador)}} type="button" value="Eliminar" className="ActionButton"/>
                </div>

                <div className="InfoConsulta">

                    {informacion}

                    <div className="SubirArchivo">
                        <input type="file" accept="image" onChange={(e) => setArchivos(e.target.files) } multiple />

                        <div className="GaleriaArchivos">
                            <Galeria handleActualizar={() => props.actualizarImagenes()} galeria={props.listaArchivos}/>
                        </div>

                    </div>

                </div>
            </div>
        </div>  
    );
}
 
export default DetalleConsulta;