import React, { Component } from 'react';

class TipoConsulta extends Component {
    state = {
        tipo : "Ortodoncia"
    }

    render() { 
        return ( 
            <div className="TipoConsulta">
                <label>Tipo de consulta: </label>
                <select value={this.state.tipo} onChange={(e) => {this.setState({ tipo:e.target.value }); this.props.seleccionarTipo(e.target.value)}}>
                    <option value="Ortodoncia">Ortodoncia</option>
                    <option value="Arreglo">Arreglo</option>
                    <option value="Extraccion">Extraccion</option>
                    <option value="Blanqueamiento">Blanqueamiento</option>
                    <option value="Limpieza">Limpieza</option>
                    <option value="Cirugia">Cirugia</option>
                    <option value="Implante">Implante</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
        );
    }
}
 
export default TipoConsulta;