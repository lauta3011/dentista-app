import React, { Component } from 'react';

class TablaHistoriaClinica extends Component {

    render() { 
        let tabla;

        if(this.props.historia.nombre !== 'vacio'){
            tabla = (
                    <div>
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
                            {/* {this.props.historia.map((c, index) => (
                                <tr key={index}>
                                    <td>{c.Fecha}</td>
                                    <td>{c.Hora}</td>
                                    <td>{c.Descripcion}</td>
                                    <td>{c.Completada}</td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
            )
        }else{
            tabla = (
                <div>
                    <span>fa ta vacio esto man</span>
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