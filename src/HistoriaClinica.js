import { React, useState } from 'react';
import TablaHistoriaClinica from './TablaHistoriaClinica.js';
import DetalleConsulta from './DetalleConsulta.js';
import Buscador from './Buscador.js';

function HistoriaClinica(props) {
    const [mostrar, setMostrar] = useState('none');
    const [nombre, setNombre] = useState('');
    const [detalle, setDetalle] = useState({});
    const [archivos, setArchivos] = useState();
    
    const buscarHistoriaClinica = async(cedula) => {
        props.handleTraerHistoriaClinica('historia', cedula)
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

    if(nombre !== ''){
        titulo = <h2>{nombre}</h2>

        if(props.consultas.length > 0){
            if(mostrar == 'none'){
                mostrarConsultas = (
                    <div>
                        <TablaHistoriaClinica handleVerDetalle={(consulta) => { traerArchivos(consulta.Identificador); setMostrar('initial'); setDetalle(consulta)}} historia={props.consultas} />
                    </div>
                )
            }else{
                // mostrarConsultas = <DetalleConsulta listaArchivos={archivos} mostrar={mostrar} consulta={detalle} handleEliminarConsulta={(identificador) => {eliminarConsulta(identificador)}} handleCerrarModal={() => { setMostrar('none'); setArchivos('vacio') }} />
                mostrarConsultas = <DetalleConsulta mostrar={mostrar} handleEliminarConsutla={(identificador) => {eliminarConsulta(identificador)}} handleCerrarModal={() => setMostrar('none')} galeria={archivos} consulta={detalle} /> 
            }
        }
    }else{
        titulo = <h2>Historia clinica</h2>
    }

    return (  
        <div>
            <div>
                {titulo}
                <span>Busca el nombre de un paciente para traer toda su historia clinica.</span>
            </div>
            
            <Buscador getPaciente={(paciente) => {buscarHistoriaClinica(paciente.Cedula); setNombre(paciente.Nombre)}}/>
            {mostrarConsultas}

        </div>
    );
}
 
export default HistoriaClinica;