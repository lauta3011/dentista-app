import React, { useState } from 'react';

import './Imagen.css';

function Imagen(props) {
    return (  
        <div className="Imagen">
            <span className='nombre' onClick={() => window.open(props.imagen.Imagen)} >{props.imagen.Nombre}</span>
            <span className='eliminar' onClick={() => props.handleEliminarImagen(props.imagen) }>ELIMINAR</span>
        </div>
    );
}
 

export default Imagen;