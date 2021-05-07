import React, { useState } from 'react';
import DetalleConsulta from './DetalleConsulta.js';
import TablaConsultas from './TablaConsultas.js';
import './Consultas.css';

function Consultas(props){

    const [mostrar, setMostrar] = useState('none');
    const [detalle, setDetalle] = useState({});
    const [archivos, setArchivos] = useState([]);

    const traerArchivos = async(identificador) => {
        console.log(identificador);
        const lista = await window.api.getArchivos({ identificador: identificador});
        const listaArchivos = [];
        
        lista.map(a => (
            listaArchivos.push(a.Nombre)
        ));
        setArchivos(listaArchivos);
    }

    const consultas = props.consultas;

    return (
        <div className="Consultas">
            <div>
                <h2>Consultas</h2>
                <p>Estas son todas las consultas que estan agendadas para hoy.</p>
            </div>

            <TablaConsultas mostrarDetalleConsulta={(consulta) => { setDetalle(consulta); setMostrar('initial'); traerArchivos(consulta.Identificador)}} listaConsultas={consultas} />
            <DetalleConsulta mostrar={mostrar} handleCerrarModal={() => setMostrar('none')} archivos={archivos} consulta={detalle} />
            
        </div>
    );
}
 
export default Consultas;