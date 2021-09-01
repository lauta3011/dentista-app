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
   
    const [mostrar, setMostrar] = useState(false);
    const [detalle, setDetalle] = useState({});
    const [cuando, setCuando] = useState(fechaHoy);

    const consultas = props.consultas;
    let mostrarConsultas;
    
    useEffect(() => {
        props.handleTraerConsultas(cuando);
    }, [cuando, mostrar])

    const eliminarConsulta = (identificador) => {
        props.handleEliminarConsulta(identificador);
    }
    
    if(consultas.length > 0){
            mostrarConsultas = (
                <TablaConsultas mostrarDetalleConsulta={(consulta) => { setDetalle(consulta); setMostrar(!mostrar)}} listaConsultas={consultas} />
            );
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
            {mostrar && <DetalleConsulta mostrar={mostrar} consulta={detalle} handleActualizar={() => { props.handleTraerConsultas(cuando); } } handleEliminarConsutla={(identificador) => {eliminarConsulta(identificador); setMostrar(!mostrar);}} handleCerrarModal={() => setMostrar(!mostrar)} />}
            
        </div>
    );
}
 
export default Consultas;