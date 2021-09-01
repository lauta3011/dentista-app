import React, { Component } from 'react';
import './Tabla.css';

class TablaHistoriaClinica extends Component {

    render() { 
        let tabla;

        if(this.props.historia.length > 0){
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
                            {this.props.historia.map((c, index) => (
                                <tr key={index}>
                                    <td>{c.Fecha}</td>
                                    <td>{c.Hora}</td>
                                    <td className="Descripcion">{c.Descripcion}</td>
                                    <td className="VerDetalle" onClick={() =>  this.props.handleVerDetalle(c)}><span>Ver detalle</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>                    
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