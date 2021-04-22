import React, { Component } from 'react';
import Buscador from './Buscador';
import './NuevaConsulta.css';

class NuevaConsulta extends Component {
    state = {  
        nombre : '',
        fecha : '',
        descripcion : ''
    }

    ingresarNombre = (event) =>{
        this.setState({nombre : event.target.value});
    }

    ingresarDescripcion = (event) =>{
        this.setState({descripcion : event.target.value});
    }

    ingresarFecha = (event) =>{
        this.setState({fecha : event.target.value});
    }

    handleSubmit = async(event) => {
        
        let nombre = this.state.nombre;
        let fecha = this.state.fecha;
        let descripcion = this.state.decripcion;
        // let cedula = this.state.cedula;
        
        if((nombre !== "" && nombre !== " ") && (fecha !== "" && fecha !== " ") && 
            (descripcion !== "" && descripcion !== " "))
        {
            console.log(nombre, ' ', fecha, ' ', descripcion);
            await window.api.postAgregarConsulta({ nombre: nombre, fecha: fecha, descripcion:descripcion });
        }
        else
        {
            console.log('eeee bobo');
        }
    }

    render() { 
        return (  
            <div>                
                <div>
                    <h2>Agregar una consulta</h2>
                    <p>Completa este formulario con los datos de la consulta a agregar.</p>
                </div>
                <form className="NuevaConsulta">
                    <div className="contenedor" > {/*style={{float:'left',width:'50%'}}>*/}
                        <Buscador getPaciente={(p) => { console.log(p) }}/>
                        {/* <div><input onChange={this.ingresarNombre} value={this.state.nombre} type="text" placeholder="Ingrese paciente"/></div> */}
                        <div><input onChange={this.ingresarFecha} value={this.state.fecha} type="date" /></div>
                        <div><input onChange={this.ingresarFecha} value={this.state.fecha} type="time" /></div>
                    </div>
                    
                    <div className="contenedor" > {/*style={{float:'right',width:'50%'}}>*/}
                        <div>
                            <span>Que tipo de consulta es?: </span>
                            <select>
                                <option>Ortodoncia</option>
                                <option>Arreglo</option>
                                <option>Extraccion</option>
                                <option>Blanqueamento</option>
                                <option>Limpieza</option>
                                <option>Cirugia</option>
                                <option>Implante</option>
                            </select>
                        </div>
                        
                        <div><textarea onChange={this.ingresarDescripcion} value={this.state.descripcion} type="text" placeholder="Descripcion de la consulta"/></div>
                        <div><span>Completada: </span><input onChange={this.ingresarFecha} value={this.state.fecha} type="checkbox"/></div>
                    </div>
                    
                    <input onClick={this.handleSubmit} type="button" value="Crear consulta"/>
                </form>
            </div>
        );
    }
}
 
export default NuevaConsulta;