import React, { Component } from 'react';
import './Tabla.css';

class TablaConsultas extends Component {
    state = {  }
    render() { 
        return (  
            <div className="Tabla">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Descripcion</th>
                            <th>Completada</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.listaConsultas.map((c, index) => (
                            <tr key={index}>
                                <td>{c.Nombre} {c.Apellido}</td>
                                <td>{c.Fecha}</td>
                                <td>{c.Hora}</td>
                                <td>{c.Descripcion}</td>
                                <td> <input defaultChecked={c.Completada} onChange={() => this.handleCheck()} type="checkbox"/></td>
                                <td className="VerDetalle"><span onClick={() => this.props.mostrarDetalleConsulta(c)} >Ver detalle</span> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default TablaConsultas;