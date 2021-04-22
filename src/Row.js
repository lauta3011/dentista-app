import React, { Component } from 'react';

//  ------- DEPRECADO!!!! 

class Row extends Component {
    state = {  }
    render() { 
        return (  
            <div className="Row">
                <span>{this.props.nombre} + " " + {this.props.apellido}</span>
                <span>{this.props.fecha}</span>
            </div>
            
        );
    }
}
 
export default Row;