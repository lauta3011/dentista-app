import { useEffect } from 'react';
import './Tabla.css';

function TablaConsultas(props) {
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
                    {props.listaConsultas.map((c, index) => (
                        <tr key={index}>
                            <td>{c.Nombre} {c.Apellido}</td>
                            <td>{c.Fecha}</td>
                            <td>{c.Hora}</td>
                            <td className="Descripcion">{c.Descripcion}</td>
                            <td> <input defaultChecked={c.Completada} onChange={() => this.handleCheck()} type="checkbox"/></td>
                            <td className="VerDetalle" onClick={() => props.mostrarDetalleConsulta(c)} ><span>Ver detalle</span> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default TablaConsultas;