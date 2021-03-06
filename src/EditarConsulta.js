import React, { useState } from 'react';
import Galeria from './Galeria.js'
import TipoConsulta from './TipoConsulta.js'

function EditarConsulta(props) {
    const [consulta, setConsulta] = useState(props.consulta);
    const [consultaNueva, setConsultaNueva] = useState(props.consulta);
    const [archivos, setArchivos] = useState([]);

    const guardarEditarConsulta = async() => {
        if(consulta != consultaNueva || archivos.length > 0){
            if(archivos.length > 0){
                let listaArchivos = [];
                
                for(var i = 0; i < archivos.length; i++){
                    listaArchivos.push({name:archivos[i].name, path:archivos[i].path});
                }        
                
                await window.api.postAgregarArchivos({ identificador:consulta.Identificador, archivos:listaArchivos })
            }
            props.handleGuardarCambios(consultaNueva)
        }else {
            props.handleCancelarEditar();
        }
    }

    return (
        <div className="EditarConsulta">
            <div className="Info">                    
                <div className="contenedor"><label>Descripcion: </label><textarea style={{width:'100%'}} defaultValue={consulta.Descripcion}  onChange={(e) => {setConsultaNueva(prevState => ({...prevState, Descripcion:e.target.value})) }}></textarea></div>
                
                <TipoConsulta seleccionarTipo={(t) => setConsultaNueva(prevState => ({...prevState, Tipo:t}))}/>

                <div className="contenedor"><label>Completada: </label><input defaultChecked={consulta.Completada} onChange={(e) => { setConsultaNueva(prevState => ({...prevState, Completada:e.target.checked}))} } type="checkbox"/></div>
                <div className="contenedor"><label>Costo: </label><input type="text" onChange={(e) => {setConsultaNueva(prevState => ({...prevState, Costo:e.target.value})) }} defaultValue={consulta.Costo}/></div>
            </div>

            <div className="SubirArchivo">
                <input style={{marginBottom:'15px'}} type="file" accept="image" onChange={(e) => setArchivos(e.target.files)} multiple />
                    
                <div className="GaleriaArchivos">
                    <Galeria handleActualizar={() => props.actualizarImagenes()} galeria={props.listaArchivos}/>
                </div>

            </div>

            <div style={{textAlign:'center'}}>
                <input type="button" value="Guardar cambios" onClick={() => { guardarEditarConsulta() }}/>
            </div>
        </div>
    )
}

export default EditarConsulta;