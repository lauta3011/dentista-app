import React, { Component } from 'react';
import './NuevoPaciente.css'

class NuevoPaciente extends Component {
    state = { 
        nombre : "",
        telefono : "",
        cedula : ""
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

                    <div className="Input">
                        <label htmlFor="txtNombre">Nombre completo</label>
                        <input id="txtNombre" type="text" value={this.state.nombre} onChange={(e) => { this.setState({ nombre:e.target.value }) }} />
                    </div>

                    <div className="Input">
                        <label htmlFor="txtCedula">Cedula</label>
                        <input id="txtCedula" type="text" value={this.state.cedula} onChange={(e) => { this.setState({ cedula:e.target.value }) }} />
                    </div>

                    <div className="Input">
                        <label htmlFor="txtTelefono">Telefono</label>
                        <input id="txtTelefono" type="text" value={this.state.telefono} onChange={(e) => { this.setState({ telefono:e.target.value }) }} />
                    </div>

                    <div className="Submit">
                        <input onClick={this.handleSubmit} type="button" value="Agregar paciente"/>
                    </div>

                </form>
            </div>
        );
    }
}
 
export default NuevoPaciente;