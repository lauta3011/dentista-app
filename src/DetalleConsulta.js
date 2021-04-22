import React, { Component } from 'react';
import './DetalleConsulta.css';
import Galeria from './Galeria.js'

class DetalleConsulta extends Component {
    state = {  
        galeria : ["aaaa","bbbb","cccc"]
    }

    cerrarModal = () => {
        this.props.handleCerrarModal();
    }

    render() { 
        return (              
            <div style={{display:this.props.mostrar}} className="Modal">
                <div onClick={() => this.cerrarModal()} className="FondoModal"></div>

                <div className="DetalleConsulta">
                    <h2>Detalle de consulta</h2>
                    <div className="InfoConsulta">
                        <h3>{this.props.consulta.Paciente}</h3>
                        <div className="contenedor"><label>Fecha: </label><span>{this.props.consulta.Fecha}</span></div>
                        <div className="contenedor"><label>Hora: </label><span>{this.props.consulta.Hora}</span></div>
                        <div className="contenedor"><label>Descripcion: </label><span>{this.props.consulta.Descripcion}</span></div>
                        <div className="contenedor"><label>Tipo: </label><span>{this.props.consulta.Tipo}</span></div>
                        <div className="contenedor"><label>Costo: </label><span>{this.props.consulta.Costo}</span></div>
                        <div className="contenedor"><label>Completada: </label><input defaultChecked={this.props.consulta.Completada} onChange={() => this.handleCheck()} type="checkbox"/></div>
                        
                        <div className="SubirArchivo">
                            <input type="file" multiple/>
                            
                            <div className="GaleriaArchivos">
                                <Galeria galeria={this.state.galeria}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>  
        );
    }
}
 
export default DetalleConsulta;