import React, { Component } from 'react';
import Pacientes from './Pacientes';
import './Buscador.css';

class Buscador extends Component {
    state = {  
        nombre : '',
        pacientes : [],
        paciente : {},
        hayPaciente : false
    }
    
    buscarHistoriaClinica = (p) => {
        this.setState({ pacientes:[] })
        this.setState({ paciente:p })
        this.setState({ hayPaciente:true })
        this.props.getPaciente(p);
        
    }

    buscarPaciente = async(nombre) => {
        this.setState({ hayPaciente:false })
        const paciente = await window.api.getPaciente({ nombre: nombre });
        Promise.all(paciente).then(res => { this.setState({ pacientes:res }) });
    }
    
    render() { 
        let paciente;
        let flag = this.state.hayPaciente;

        if( !flag ){
            paciente = <Pacientes seleccionarPaciente={(paciente) => this.buscarHistoriaClinica(paciente)} listaPacientes={this.state.pacientes} />;
        }
        else
        {
            paciente = <span>{this.state.paciente.Nombre}</span>;
        }

        return (  
            <div className="Buscador">
                <div>
                    <input type="text" onChange={(e) => { this.setState({nombre:e.target.value}) }} placeholder="Buscar paciente"/>
                    <input type="button" onClick={() => { this.buscarPaciente(this.state.nombre); }} value='Buscar'/>
                </div>

                {paciente}
            </div>
        );
    }
}
 
export default Buscador;