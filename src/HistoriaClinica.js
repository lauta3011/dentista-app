import { React, Component } from 'react';
import Buscador from './Buscador.js';
import TablaHistoriaClinica from './TablaHistoriaClinica.js';

class HistoriaClinica extends Component {
    state = { 
        historia : { nombre: 'vacio' },
        nombre : ''
    }

    buscarHistoriaClinica = async(cedula) => {
        const historiaClinica = await window.api.getHistoriaClinica({ cedula : cedula });
        Promise.all(historiaClinica).then(res => { this.setState({ historia : res }); console.log('x aca ando', res); });
    }    

    render() { 
        let titulo;

        if(this.state.nombre !== ''){
            titulo = <h2>{this.state.nombre}</h2>
        }else{
            titulo = <h2>Historia clinica</h2>
        }

        return (  
            <div>
                <div>
                    {titulo}
                    <span>Busca el nombre de un paciente para traer toda su historia clinica.</span>
                </div>
                <Buscador getPaciente={(paciente) => {this.buscarHistoriaClinica(paciente.Cedula); this.setState({ nombre:paciente.Nombre })}}/>
                <TablaHistoriaClinica historia={this.state.historia}/>
            </div>
        );
    }
}
 
export default HistoriaClinica;