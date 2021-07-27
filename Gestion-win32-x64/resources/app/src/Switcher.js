import React, { Component } from 'react';
import Boton from './Boton.js';
import './Switcher.css';

// DEPRECADOOOOO!!!


class Switcher extends Component {
    state = {  }

    handleMostrarContenedor = (tipo) => {
        if(tipo === "Agregar paciente"){
            this.props.handleMostrarBuscarPaciente();
        }
        else if (tipo === "Nueva consulta"){
            this.props.handleMostrarNuevaConsulta();
        }else if(tipo === "Ver consultas"){
            this.props.handleVerConsultas();
        }
    }

    render() { 
        return (  
            <div className="Switcher">
                {/* <Boton mostrarContenedor={(tipo) => this.handleMostrarContenedor(tipo)} nombre="Ver consultas" />
                <Boton mostrarContenedor={(tipo) => this.handleMostrarContenedor(tipo)} nombre="Historia clinica" />
                <Boton mostrarContenedor={(tipo) => this.handleMostrarContenedor(tipo)} nombre="Agregar paciente" />
                <Boton mostrarContenedor={(tipo) => this.handleMostrarContenedor(tipo)} nombre="Nueva consulta" /> */}
            </div>
        );
    }
}
 
export default Switcher;