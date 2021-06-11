import React, { Component } from 'react';
import Buscador from './Buscador';
import TipoConsulta from './TipoConsulta';
import './NuevaConsulta.css';

class NuevaConsulta extends Component {
    state = {  
        paciente : '',
        nombre: '',
        fecha : '',
        hora: '',
        costo: '',
        tipo: 'Ortodoncia',
        archivo: [],
        completada : false,
        descripcion : ''
    }

    handleSubmit = async() => {        
        let formatFecha = this.state.fecha.replace(new RegExp('/','g'), '');
        let formatHora = this.state.hora.replace(':','');
        let id = this.state.paciente + formatFecha + formatHora+ '';

        let listaArchivos = [];
        
        for(var i = 0; i < this.state.archivo.length; i++){
            listaArchivos.push({name:this.state.archivo[i].name, path:this.state.archivo[i].path});
        }

        let consulta = {
            identificador : id,
            cedula: this.state.paciente,
            nombre: this.state.nombre,
            fecha: this.state.fecha,
            costo: this.state.costo,
            hora: this.state.hora,
            tipo: this.state.tipo,
            archivo: listaArchivos,
            completada: this.state.completada,
            descripcion: this.state.descripcion
        };
         
        console.log(consulta);
        
        if((consulta.cedula !== "" && consulta.cedula !== " ") && (consulta.fecha !== "" && consulta.fecha !== " ") && 
            (consulta.descripcion !== "" && consulta.descripcion !== " ") && (consulta.costo !== "" && consulta.costo !== " "))
        {
            await window.api.postAgregarConsulta({ consulta: consulta });
        }
        else
        {
            console.log(consulta)
        }
    }

    render() { 
        let nombre;

        if(this.state.nombre === ''){
            nombre = <div><h2 style={{margin:"0"}}>Seleccionar paciente</h2></div>
        }else{
            nombre = (<div><h2 style={{margin:"0"}}>{this.state.nombre}</h2></div>)
        }

        return (  

            <div>                
                <div>
                    <h2>Agregar una consulta</h2>
                    <p>Completa este formulario con los datos de la consulta a agregar.</p>
                </div>

                <form className="NuevaConsulta">
                    <div className="InnerContenedor">

                        {nombre}
                        <Buscador getPaciente={(p) => { this.setState({ paciente:p.Cedula }); this.setState({ nombre:p.Nombre}) }}/>

                        <div className="Input">
                            <label htmlFor="txtFecha">Fecha</label>
                            <input id="txtFecha" onChange={(e) => { this.setState({ fecha:e.target.value })}} type="date" />
                        </div>

                        <div className="Input">
                            <label htmlFor="txtHora">Hora</label>
                            <input id="txtHora" onChange={(e) => { this.setState({ hora:e.target.value }) }} type="time" />
                        </div>

                        <div className="Input">
                            <label htmlFor="txtCosto">Costo</label>
                            <input id="txtCosto" type="text" value={this.state.costo} onChange={(e) => {this.setState({costo:e.target.value})}}/>
                        </div>                    

                    </div>

                    <div className="InnerContenedor" style={{borderLeft:"1px solid lightgray"}}>
                        <TipoConsulta seleccionarTipo={(t) => {this.setState({tipo:t})}}/>
                        
                        <div className="Input">
                            <label htmlFor="txtDescripcion">Descripcion</label>
                            <textarea id="txtDescripcion" onChange={(e) => { this.setState({ descripcion:e.target.value })}} type="text" placeholder="Descripcion de la consulta"/>
                        </div>

                        <div className="Input">
                            <label htmlFor="chkCompletada">Completada? </label><input id="chkCompletada" style={{width:"10%"}} onChange={(e) => { this.setState({ completada:e.target.value })}} defaultChecked={false} type="checkbox"/>
                        </div>

                        <div className="Input">
                            <label htmlFor="flArchivo">Agregar un archivo</label>
                            <input id="flArchivo" type="file" accept="image" onChange={(e) => { this.setState({archivo:e.target.files});}} multiple />
                        </div>

                        <input className="Submit" onClick={this.handleSubmit} type="button" value="Crear consulta"/>

                    </div>
                    
                </form>
            </div>
        );
    }
}
 
export default NuevaConsulta;