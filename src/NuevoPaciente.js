import React, { Component } from 'react';
import './NuevoPaciente.css'

class NuevoPaciente extends Component {
    state = { 
        nombre : "",
        telefono : "",
        cedula : ""
     }

    cambiarNombre = (event) => {
        this.setState({nombre : event.target.value})
    }
    
    cambiarTelefono = (event) => {
        this.setState({telefono : event.target.value})
    }
    
    cambiarCedula = (event) => {
        this.setState({cedula : event.target.value}) 
    }

    handleSubmit = async(event) => {
        
        let nombre = this.state.nombre;
        let telefono = this.state.telefono;
        let cedula = this.state.cedula;
        
        if((nombre !== "" && nombre !== " ") && 
            (telefono !== "" && telefono !== " ") && (cedula !== "" && cedula !== " "))
        {
            console.log(nombre, ' ', telefono, ' ', cedula);
            await window.api.postAgregarPaciente({ nombre: nombre, telefono:telefono, cedula:cedula });
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
                    <h2>Agregar un paciente</h2>
                    <p>Completa este formulario con los datos del paciente a agregar.</p>
                </div>
                <form onSubmit={this.handleSubmit} className="NuevoPaciente">
                    <input type="text" value={this.state.nombre} onChange={this.cambiarNombre} placeholder="Nombre y apellido"/>
                    <input type="text" value={this.state.telefono} onChange={this.cambiarTelefono} placeholder="Telefono"/>
                    <input type="text" value={this.state.cedula} onChange={this.cambiarCedula} placeholder="Cedula"/>

                    <input onClick={this.handleSubmit} type="button" value="Agregar paciente"/>
                </form>
            </div>
        );
    }
}
 
export default NuevoPaciente;