import React, { useState } from 'react';
import Header from './Header';
import NuevoPaciente from './NuevoPaciente.js';
import NuevaConsulta from './NuevaConsulta.js';
import Consultas from './Consultas';
import HistoriaClinica from './HistoriaClinica';

function Contenedor() {    
    const [mostrar, setMostrar] = useState('consultas');
    const [consultas, setConsultas] = useState([]);
    
    document.addEventListener("DOMContentLoaded", async function(event) { 
        const lista = await window.api.getConsultas();
        setConsultas(lista);
    });

    let contenido;

    switch (mostrar) {
        case 'nuevoPaciente':
            contenido = <NuevoPaciente />;
        break
        case 'nuevaConsulta':
            contenido = <NuevaConsulta />;
            break
        case 'consultas':
            contenido = <Consultas consultas={consultas}/>;;
        break
        case 'historiaClinica':
            contenido = <HistoriaClinica />;;
        break
        default:
            contenido = <Consultas />;
    }

    return (  
        <div className="Contenedor">
            <Header handleMostrarHistoriaClinica={() => setMostrar('historiaClinica')} handleVerConsultas={() => setMostrar('consultas')} handleMostrarBuscarPaciente={() => setMostrar('nuevoPaciente')} handleMostrarNuevaConsulta={() => setMostrar('nuevaConsulta')} />

            {contenido}

        </div>
    );
}
 
export default Contenedor;