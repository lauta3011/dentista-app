import React, { useState } from 'react';
import './Imagen.css';

function Imagen(props) {
    const [position, setPosition] = useState('relative');
    const [index, setIndex] = useState('0');
    const [height, setHeight] = useState('100%');
    
    return (  
        <img alt={index} onClick={() => { if(position === 'relative') {setPosition('absolute');setIndex('1');setHeight('unset');}else{setPosition('relative');setIndex('0');setHeight('100%');} }} style={{position:position, zIndex:index, height:height}} className="Imagen" src={props.imagen}/>
    );
}
 

export default Imagen;