import React from 'react';
import Imagen from './Imagen.js';
import './Galeria.css';

function Galeria(props) {
    let componenteGaleria = (
        <div style={{textAlign:'center',padding:'15px'}}>
            <span>Esta consulta no tiene archivos adjuntos.</span>
        </div>        
    );
        
    if(props.galeria != 'vacio' && props.galeria != undefined){
        componenteGaleria = (
            <div style={{display:'inline-flex'}}>
                {props.galeria.map((i, index) => (
                    <div key={index} className="imagen">
                        <Imagen alt={i} imagen={"http://localhost:4200/" + props.galeria[index].Nombre}/>
                    </div>                
                ))}    
            </div>
        )
    }else {
        componenteGaleria = (
            <div style={{textAlign:'center', padding:'15px'}}>
                <span>Esta consulta no tiene archivos adjuntos.</span>
            </div>
        );
    }

    return (
        <div>
            {componenteGaleria}
        </div>
    );
}
 
export default Galeria;