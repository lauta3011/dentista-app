import React from 'react';
import './Tabla.css';

function TablaHistoriaClinica(props) {
    let tabla = ''
    
    if(props.historia.length > 0){
        tabla = (
        <div className="Tabla">
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Descripcion</th>
                        <th></th>
                    </tr>
                </thead>
            <tbody>
                {props.historia.map((c, index) => (
                    <tr key={index}>
                        <td>{c.Fecha}</td>
                        <td>{c.Hora}</td>
                        <td className="Descripcion">{c.Descripcion}</td>
                        <td className="VerDetalle" onClick={() =>  props.handleVerDetalle(c)}><span>Ver detalle</span></td>
                    </tr>
                ))}
                </tbody>
            </table>                    
        </div>
    )}

    return (  
        <div>
            {tabla}
        </div>
    );
}
 
export default TablaHistoriaClinica;