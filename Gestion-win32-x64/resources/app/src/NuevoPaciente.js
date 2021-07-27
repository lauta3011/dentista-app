import React, { Component } from 'react';
import './NuevoPaciente.css'

class NuevoPaciente extends Component {
    state = { 
        title : "inicial",
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
            let ret = await window.api.postAgregarPaciente({ nombre: nombre, telefono:telefono, cedula:cedula });

            if(ret){
                this.setState({ title:'ok'})
            }else{
                this.setState({ title:'error'})
            }
        }
        else
        {
            this.setState({ title:'error'})
            console.log('eeee bobo');
        }
    }

    render() { 
        let title;
        if(this.state.title === 'inicial'){
            title = (<div>
                        <h2>Agregar un paciente</h2>
                        <p>Completa este formulario con los datos del paciente a agregar.</p>
                    </div>)
        }else if(this.state.title === 'ok'){
            title = (<div>
                        <h2>Paciente agregado con exito</h2>
                        <p>Completa este formulario con los datos del paciente a agregar.</p>
                    </div>)
        }else if(this.state.title === 'error'){
            title = (<div>
                <h2>Error al agregar paciente</h2>
                <p>El paciente ya existe o hay datos incompletos en el formilario.</p>
            </div>)
        }
        return (  
            <div>
                {title}

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