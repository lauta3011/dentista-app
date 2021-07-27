import React, { Component } from 'react';
import './Boton.css';

class Boton extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="Boton">
                <button onClick={() => this.props.mostrarContenedor(this.props.nombre)}>{this.props.nombre}</button>
            </div>
        );
    }
}
 
export default Boton;