import React, { useState } from 'react';
import './Imagen.css';

function Imagen(props) {
    const [position, setPosition] = useState('relative');
    const [index, setIndex] = useState('0');
    
    return (  
        <img onClick={() => { if(position === 'relative') {setPosition('absolute');setIndex('1');}else{setPosition('relative');setIndex('0')} }} style={{position:position, zIndex:index}} className="Imagen" src={props.imagen}/>
    );
}
 

export default Imagen;