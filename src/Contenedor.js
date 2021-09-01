import React, { useState, useEffect } from 'react';
import Header from './Header';
import NuevoPaciente from './NuevoPaciente.js';
import NuevaConsulta from './NuevaConsulta.js';
import Consultas from './Consultas';
import HistoriaClinica from './HistoriaClinica';

function Contenedor() {    
    const [mostrar, setMostrar] = useState('consultas');
    const [consultas, setConsultas] = useState([]);
    
    useEffect(() => {
        setConsultas([])
    }, [mostrar])

    const eliminarConsulta = async(identificador) => {
        await window.api.deleteConsulta({ identificador:identificador });
    } 

    const traerHistoriasClinicas = async(cedula) => {
        const lista = await window.api.getHistoriaClinica( {cedula:cedula });
        lista.map((c) => {
            let fecha = c.Fecha.split('-');
            let fixedFecha = fecha[2]+'/'+fecha[1]+'/'+fecha[0];
            c.Fecha = fixedFecha;
        })
        setConsultas(lista);
    }

    const traerConsultas = async(cuando, cedula) => {
        const lista = await window.api.getConsultas({ cuando:cuando, cedula:cedula });
        lista.map((c) => {
            let fecha = c.Fecha.split('-');
            let fixedFecha = fecha[2]+'/'+fecha[1]+'/'+fecha[0];
            c.Fecha = fixedFecha;
        })
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
            contenido = <HistoriaClinica handleEliminarConsulta={(identificador) => {eliminarConsulta(identificador)}} handleTraerHistoriaClinica={(cuando, cedula) => {traerHistoriasClinicas(cuando, cedula)}} consultas={consultas}/>;
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