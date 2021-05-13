import React, { useState } from 'react';
import './Imagen.css';

function Imagen(props) {
    const [position, setPosition] = useState('relative');
    
    return (  
        <img onClick={() => { if(position === 'relative') setPosition('absolute'); else setPosition('relative') }} style={{position:position}} className="Imagen" src={props.imagen}/>
    );
}
 

export default Imagen;