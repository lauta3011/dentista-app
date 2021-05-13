import React, { Component } from 'react';
import Imagen from './Imagen.js';
import './Galeria.css';

class Galeria extends Component {
    render() { 

        return (
            <div className="Galeria">
            {this.props.galeria.map((i, index) => (
                <div key={index} className="imagen">
                    <Imagen imagen={"http://localhost:8080/" + this.props.galeria[index]}/>
                </div>                
            ))}
        </div>
        );
    }
}
 
export default Galeria;