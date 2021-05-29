import React, { Component } from 'react';
import './Tabla.css';

class TablaHistoriaClinica extends Component {

    render() { 
        let tabla;

        if(this.props.historia.nombre !== 'vacio'){
            tabla = (
                    <div className="Tabla">
                        <table>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Descripcion</th>
                                    <th>Completada</th>
                                </tr>
                            </thead>
                        <tbody>
                            {this.props.historia.map((c, index) => (
                                <tr key={index}>
                                    <td>{c.Fecha}</td>
                                    <td className="Descripcion">{c.Descripcion}</td>
                                    <td>{c.Completada}</td>
                                    <td><span onClick={() =>  this.props.handleVerDetalle(c)}>Ver detalle</span></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>                    
                </div>
            )
        }else{
            tabla = (
                <div>
                    {/* <span>No hay ningun paciente seleccionado.</span> */}
                </div>
            )
        }

        return (  
            <div>
                {tabla}
            </div>
        );
    }
}
 
export default TablaHistoriaClinica;