import React from 'react';
import Imagen from './Imagen.js';
import './Galeria.css';

function Galeria(props) {

    const eliminarImagen = async(imagen) => {
        await window.api.deleteImagen({ imagen:imagen });
        props.handleActualizar();
    }

    let componenteGaleria = (
        <div style={{textAlign:'center',padding:'15px'}}>
            <span>Esta consulta no tiene archivos adjuntos.</span>
        </div>        
    );
        
    if(props.galeria != 'vacio' && props.galeria != undefined){
        componenteGaleria = (
            < >
                 {props.galeria.map((i, index) => (
                    <Imagen key={index} handleEliminarImagen={(imagen) => eliminarImagen(imagen)} alt={i} imagen={props.galeria[index]}/>
                ))}     
            </>
        )
    }else {
        componenteGaleria = (
            <div style={{textAlign:'center', padding:'15px'}}>
                <span>Esta consulta no tiene archivos adjuntos.</span>
            </div>
        );
    }

    return (
        <>
            {componenteGaleria}
        </>
    );
}
 
export default Galeria;