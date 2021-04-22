import React, { useState } from 'react';
import DetalleConsulta from './DetalleConsulta.js';
import TablaConsultas from './TablaConsultas.js';
import './Consultas.css';

function Consultas(props){

    const [mostrar, setMostrar] = useState('none');
    const [detalle, setDetalle] = useState({});
    const consultas = props.consultas;

    return (
        <div className="Consultas">
            <div>
                <p>Estas son todas las consultas que estan agendadas para hoy.</p>
            </div>

            <TablaConsultas mostrarDetalleConsulta={(consulta) => { setDetalle(consulta); setMostrar('initial')}} listaConsultas={consultas} />
            <DetalleConsulta mostrar={mostrar} handleCerrarModal={() => setMostrar('none')} consulta={detalle} />
            
        </div>
    );
}
 
export default Consultas;