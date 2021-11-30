import { React, useState, useEffect } from 'react';
import DatosPaciente from './DatosPaciente.js';
import DetalleConsulta from './DetalleConsulta.js';
import Flecha from './Flecha.js';
import TablaHistoriaClinica from './TablaHistoriaClinica.js';
import Buscador from './Buscador.js';

function HistoriaClinica(props) {
    const [mostrar, setMostrar] = useState(false);
    const [paciente, setPaciente] = useState();
    const [detalle, setDetalle] = useState({});
    const [archivos, setArchivos] = useState();
    const [consultas, setConsultas] = useState([]);

    useEffect(() => {
        setConsultas(props.consultas)
    }, [props.consultas])

    const buscarHistoriaClinica = async(cedula) => {
        props.handleTraerHistoriaClinica(cedula)
    }   

    const eliminarConsulta = (identificador) => {
        props.handleEliminarConsulta(identificador);
    }

    const traerArchivos = async(identificador) => {
        const lista = await window.api.getArchivos({ identificador: identificador});
        let listaArchivos = [];

        if(lista !== 'vacio'){
            lista.map(a => (
                listaArchivos.push(a)
                ));
            }else {
            listaArchivos = lista;
        }
        setArchivos(listaArchivos);
    }

    let historiaClinica = '';
    let mostrarConsultas = '';

    if(paciente != {}){
        historiaClinica = <DatosPaciente paciente={paciente}/>
        if(props.consultas.length > 0){
            mostrarConsultas = <TablaHistoriaClinica historia={consultas} handleVerDetalle={(consulta) => { traerArchivos(consulta.Identificador); setMostrar(!mostrar); setDetalle(consulta)}} />
        }else {
            mostrarConsultas = ''
        }
    }

    return (  
        <div>
            {paciente && <Flecha volver={() => setPaciente(null) }/>}

            {!paciente && 
            (<div>
                <h2>Historia clinica</h2>
                <span>Busca el nombre de un paciente para traer toda su historia clinica.</span>
            </div>)
            }            

            {!paciente && <Buscador getPaciente={(paciente) => {buscarHistoriaClinica(paciente.Cedula); setPaciente(paciente)}}/>}
            {paciente && historiaClinica}
            {props.consultas.length > 0 && <h4>Consultas</h4>}
            {props.consultas.length > 0 && mostrarConsultas}
            {mostrar && <DetalleConsulta handleActualizar={() => buscarHistoriaClinica(paciente.Cedula) } handleEliminarConsutla={(identificador) => { eliminarConsulta(identificador); setMostrar(!mostrar)}} handleCerrarModal={() => setMostrar(!mostrar)} galeria={archivos} consulta={detalle} />}

        </div>
    );
}
 
export default HistoriaClinica;