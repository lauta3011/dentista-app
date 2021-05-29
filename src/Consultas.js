import React, { useState } from 'react';
import DetalleConsulta from './DetalleConsulta.js';
import TablaConsultas from './TablaConsultas.js';
import './Consultas.css';

function Consultas(props){
    const [mostrar, setMostrar] = useState('none');
    const [detalle, setDetalle] = useState({});
    const [cuando, setCuando] = useState('hoy');
    const [archivos, setArchivos] = useState('vacio');

    const consultas = props.consultas;
    let mostrarConsultas;

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
    
    const traerConsultas = (cuando) => {
        props.handleTraerConsultas(cuando);
    }
        
    if(consultas.length > 0){
        mostrarConsultas = (
            <div>
                <TablaConsultas mostrarDetalleConsulta={(consulta) => { setArchivos([]); traerArchivos(consulta.Identificador); setDetalle(consulta); setMostrar('initial'); }} listaConsultas={consultas} />
                <DetalleConsulta mostrar={mostrar} handleEliminarConsutla={(identificador) => {eliminarConsulta(identificador)}} handleCerrarModal={() => setMostrar('none')} listaArchivos={archivos} consulta={detalle} />
            </div>
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
                <p>Estas son todas las consultas que estan agendadas para 
                    <select value={cuando} onChange={(e) => { setCuando(e.target.value); traerConsultas(e.target.value); }}>
                        <option value="hoy">hoy</option>
                        <option value="manana">mañana</option>
                        <option value="todas">todas</option>
                    </select>
                </p>
            </div>

            {mostrarConsultas}
            
        </div>
    );
}
 
export default Consultas;