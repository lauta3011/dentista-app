import React, { Component } from 'react';
import Boton from './Boton.js';
import './Header.css';

class Header extends Component {
    state = {  }

    mostrarConsultas(){
        this.props.handleVerConsultas();
    }

    buscarPaciente(){
        this.props.handleMostrarBuscarPaciente();
    }

    nuevaConsulta(){
        this.props.handleMostrarNuevaConsulta();
    }
    
    mostrarHistoriaClinica(){
        this.props.handleMostrarHistoriaClinica();
    }

    render() { 
        return (  
            <div className="Header">
                {/* <Buscador /> */}
                <Boton mostrarContenedor={() => this.mostrarConsultas()} nombre="Ver consultas" />
                <Boton mostrarContenedor={() => this.mostrarHistoriaClinica()} nombre="Historia clinica" />
                <Boton mostrarContenedor={() => this.buscarPaciente()} nombre="Agregar paciente" />
                <Boton mostrarContenedor={() => this.nuevaConsulta()} nombre="Nueva consulta" />
            </div>
        );
    }
}
 
export default Header;