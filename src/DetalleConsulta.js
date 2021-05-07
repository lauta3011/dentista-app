import React, { useState } from 'react';
import './DetalleConsulta.css';
import Galeria from './Galeria.js'

function DetalleConsulta(props) {
    let src = "http://localhost:8080/" + props.archivos[0] ;
    let imagen = (<div><img src={src} /></div>);
        
    return (              
        <div style={{display:props.mostrar}} className="Modal">
            <div onClick={() => props.handleCerrarModal()} className="FondoModal"></div>

            <div className="DetalleConsulta">
                
                <div className="HeaderDetalle">
                    <h2>{props.consulta.Nombre}</h2>
                    <input type="button" value="Editar" className="ActionButton"/>
                    <input type="button" value="Eliminar" className="ActionButton"/>
                </div>

                <div className="InfoConsulta">
                        {imagen}
                    <div className="Info">
                        <div className="contenedor"><label>Descripcion: </label><span>{props.consulta.Descripcion}</span></div>
                        <div className="contenedor"><label>Tipo: </label><span>{props.consulta.Tipo}</span></div>
                        <div className="contenedor"><label>Fecha: </label><span>{props.consulta.Fecha}</span></div>
                        <div className="contenedor"><label>Hora: </label><span>{props.consulta.Hora}</span></div>
                        <div className="contenedor"><label>Completada: </label><input defaultChecked={props.consulta.Completada} onChange={() => this.handleCheck()} type="checkbox"/></div>
                        <div className="contenedor"><label>Costo: </label><span>{props.consulta.Costo}</span></div>
                    </div>
                    
                    <div className="SubirArchivo">
                        <input type="file" accept="image" multiple/>
                        
                        <div className="GaleriaArchivos">
                            {/* <Galeria galeria={archivos}/> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>  
    );
}
 
export default DetalleConsulta;