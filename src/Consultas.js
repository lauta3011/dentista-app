import React, { useEffect, useState } from 'react';
import DetalleConsulta from './DetalleConsulta.js';
import TablaConsultas from './TablaConsultas.js';
import './Consultas.css';

function Consultas(props){
    const date = new Date();
    const dia = date.getDate() < 10 ?  '0'+date.getDate() : date.getDate();
    let mesFormat = date.getMonth()+1;
    const mes = mesFormat < 10 ?  '0'+mesFormat : mesFormat;
    let fechaHoy = date.getUTCFullYear() + '-' + mes + '-' + dia;
    const [mostrar, setMostrar] = useState('none');
    const [detalle, setDetalle] = useState({});
    const [cuando, setCuando] = useState(fechaHoy);
    const [archivos, setArchivos] = useState('vacio');

    const consultas = props.consultas;
    let mostrarConsultas;
    
    useEffect(() => {
        props.handleTraerConsultas(cuando);
    }, [cuando])
    

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
        setMostrar('initial');
        setArchivos(listaArchivos);
    }

    if(consultas.length > 0){
        if(mostrar == 'none'){
            mostrarConsultas = (
                <div>
                    <TablaConsultas mostrarDetalleConsulta={(consulta) => { traerArchivos(consulta.Identificador); setDetalle(consulta); }} listaConsultas={consultas} />
                </div>
            );
        }else{
            mostrarConsultas =(
                <DetalleConsulta mostrar={mostrar} handleActualizar={() => { props.handleTraerConsultas(cuando); } } handleEliminarConsutla={(identificador) => {eliminarConsulta(identificador)}} handleCerrarModal={() => setMostrar('none')} galeria={archivos} consulta={detalle} /> 
            )
        }
    }else{
        mostrarConsultas = (
            <div>
                <h3>No hay consultas agendadas para esta fecha.</h3>
            </div>
        )
    }

    return (
        <div className="Consultas">
            <div>
                <h2>Consultas</h2>
                <p>Estas son todas las consultas que estan agendadas para el
                    <input type="date" onChange={(e) => { setCuando(e.target.value); }} value={cuando} />
                </p>
            </div>

            {mostrarConsultas}
            
        </div>
    );
}
 
export default Consultas;