import React, { useState } from 'react';
import Header from './Header';
import NuevoPaciente from './NuevoPaciente.js';
import NuevaConsulta from './NuevaConsulta.js';
import Consultas from './Consultas';
import HistoriaClinica from './HistoriaClinica';

function Contenedor() {    
    const [mostrar, setMostrar] = useState('consultas');
    const [consultas, setConsultas] = useState([]);
    const [archivos, setArchivos] = useState();
    
    document.addEventListener("DOMContentLoaded", async function(event) { 
        traerConsultas('hoy');
    });

    const eliminarConsulta = async(identificador) => {
        const eliminado = await window.api.deleteConsulta({ identificador:identificador });
        console.log(eliminado);
    } 

    const traerConsultas = async(cuando, cedula) => {
        const lista = await window.api.getConsultas({ cuando:cuando, cedula:cedula });
        setConsultas(lista);
    }

    let contenido;

    switch (mostrar) {
        case 'nuevoPaciente':
            contenido = <NuevoPaciente />;
        break
        case 'nuevaConsulta':
            contenido = <NuevaConsulta />;
            break
        case 'consultas':
            contenido = <Consultas handleEliminarConsulta={(identificador) => {eliminarConsulta(identificador)}} handleTraerConsultas={(cuando) => {traerConsultas(cuando)}} consultas={consultas} />;
        break
        case 'historiaClinica':
            contenido = <HistoriaClinica handleEliminarConsulta={(identificador) => {eliminarConsulta(identificador)}} handleTraerHistoriaClinica={(cuando, cedula) => {traerConsultas(cuando, cedula)}} consultas={consultas}/>;
        break
        default:
            contenido = <Consultas handleEliminarConsulta={(identificador) => {eliminarConsulta(identificador)}} handleTraerConsultas={(cuando) => {traerConsultas(cuando)}}/>;
    }

    return (  
        <div className="Contenedor">
            <Header handleMostrarHistoriaClinica={() => setMostrar('historiaClinica')} handleVerConsultas={() => setMostrar('consultas')} handleMostrarBuscarPaciente={() => setMostrar('nuevoPaciente')} handleMostrarNuevaConsulta={() => setMostrar('nuevaConsulta')} />

            {contenido}

        </div>
    );
}
 
export default Contenedor;