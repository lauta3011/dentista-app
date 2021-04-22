import { React, useState} from 'react';
import Buscador from './Buscador.js';
import TablaHistoriaClinica from './TablaHistoriaClinica.js';

function HistoriaClinica() {

    const [paciente, setPaciente] = useState({nombre:'vacio'});

    return (  
        <div>
            <Buscador getPaciente={(paciente) => setPaciente(paciente)}/>
            
            <TablaHistoriaClinica historia={paciente}/>
        </div>
    )
}
 
export default HistoriaClinica;