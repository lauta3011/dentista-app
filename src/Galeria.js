import React, { Component } from 'react';
import './Galeria.css';

class Galeria extends Component {
    state = {  
        imagenes : this.props.galeria
    }
    render() { 
        return (
            <div className="Galeria">
                {this.state.imagenes.map((i, index) => (
                    <div key={index} className="imagen">
                        <span>{i}</span>
                    </div>                
                ))}
            </div>
        );
    }
}
 
export default Galeria;