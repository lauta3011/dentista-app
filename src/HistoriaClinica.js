import { React, useState, useEffect } from 'react';
import TablaHistoriaClinica from './TablaHistoriaClinica.js';
import DetalleConsulta from './DetalleConsulta.js';
import Buscador from './Buscador.js';

function HistoriaClinica(props) {
    const [mostrar, setMostrar] = useState(false);
    const [paciente, setPaciente] = useState({Nombre:'Historia clinica'});
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

    let titulo;
    let mostrarConsultas;

    if(paciente != {}){
        titulo = <h2>{paciente.Nombre}</h2>
        if(props.consultas.length > 0){
            mostrarConsultas = <TablaHistoriaClinica historia={consultas} handleVerDetalle={(consulta) => { traerArchivos(consulta.Identificador); setMostrar(!mostrar); setDetalle(consulta)}} />
        }else {
            mostrarConsultas = (
                <div>
                    <span>La historia clinica de este paciente esta vacia.</span>
                </div>
            )
        }
    }

    return (  
        <div>
            <div>
                {titulo}
                <span>Busca el nombre de un paciente para traer toda su historia clinica.</span>
            </div>
            
            <Buscador getPaciente={(paciente) => {buscarHistoriaClinica(paciente.Cedula); setPaciente(paciente)}}/>
            {mostrarConsultas}
            {mostrar && <DetalleConsulta handleActualizar={() => buscarHistoriaClinica(paciente.Cedula) } handleEliminarConsutla={(identificador) => { eliminarConsulta(identificador); setMostrar(!mostrar)}} handleCerrarModal={() => setMostrar(!mostrar)} galeria={archivos} consulta={detalle} />}

        </div>
    );
}
 
export default HistoriaClinica;