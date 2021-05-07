const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {  
  
  getPaciente: (args) => {
    
    return new Promise(resolve => {
      ipcRenderer.send('get-paciente', args);
      ipcRenderer.once('return-paciente', (_, result) => { resolve(result) });
    })
  },

  getArchivos: (args) => {
    return new Promise(resolve => {
      ipcRenderer.send('get-archivos', args);
      ipcRenderer.on('return-archivos', (_, result) => { resolve(result) });
    })
  },
  
  getHistoriaClinica: (args) => {
    return new Promise(resolve => {
      ipcRenderer.send('get-historia-clinica', args);
      ipcRenderer.once('return-historia', (_, result) => { resolve(result) });
    })
  },

  getConsultas: (args) => { 
    return new Promise(resolve => {
      ipcRenderer.send('get-consultas', args);
      ipcRenderer.once('return-consultas', (_, result) => { resolve(result) });
    })
  },

  // getDetalleConsultas: (args) => ipcRenderer.invoke('get-consultas', args, ),
  
  postAgregarArchivos: (args) => ipcRenderer.invoke('post-archivos', args),
  
  postAgregarConsulta: (args) => ipcRenderer.invoke('post-agregar-consulta', args),

  postAgregarPaciente: (args) => ipcRenderer.invoke('post-agregar-paciente', args)

} );