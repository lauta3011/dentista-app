const { app, BrowserWindow, ipcMain } = require('electron'); // electron
const isDev = require('electron-is-dev'); // To check if electron is in development mode
const path = require('path');
const sqlite3 = require('sqlite3');
const fs = require('fs');

let mainWindow;

// Initializing a new database
const db = new sqlite3.Database(
  isDev ? path.join(__dirname, '../db/database.db') // my root folder if in dev mode
    : path.join(process.resourcesPath, 'db/database.db'), // the resources path if in production build
  (err) => {
    if (err) {
      console.log(`Database Error: ${err}`);
    } else {
      console.log('Database Loaded');
      crearTablas();
    }
  }
);

const crearTablas = () => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS Paciente (Nombre TEXT NOT NULL, Telefono NUMERIC NOT NULL, Cedula NUMERIC NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS Consulta (Paciente NUMERIC NOT NULL, Descripcion TEXT, Tipo TEXT NOT NULL, Fecha NUMERIC NOT NULL, Hora NUMERIC NOT NULL, Costo NUMERIC NOT NULL, Archivos TEXT, Completada INTEGER NOT NULL, Identificador TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS Archivos (Id INTEGER AUTO_INCREMENT, Nombre TEXT NOT NULL, Consulta TEXT NOT NULL, Imagen BLOB NOT NULL)');
  });
}

// Initializing the Electron Window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200, // width of window
    height: 700, // height of window
    webPreferences: {
      // The preload file where we will perform our app communication
      preload: isDev 
        ? path.join(app.getAppPath(), './public/preload.js') // Loading it from the public folder for dev
        : path.join(app.getAppPath(), './build/preload.js'), // Loading it from the build folder for production
      worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
      contextIsolation: true, // Isolating context so our app is not exposed to random javascript executions making it safer.
    },
  });

ipcMain.on('get-consultas', async(event, args) => {
  let rows = [];
  let query = 'SELECT p.Nombre as Nombre, c.Fecha, c.Hora, c.Descripcion, c.Completada, c.Costo, c.Identificador, c.Tipo FROM Consulta c, Paciente p WHERE p.Cedula = c.Paciente';
  let parameters = [];

  if(args.cuando == 'historia'){
    query = 'SELECT p.Nombre as Nombre, c.Fecha, c.Hora, c.Descripcion, c.Completada, c.Costo, c.Identificador, c.Tipo FROM Consulta c, Paciente p WHERE p.Cedula = c.Paciente AND c.Paciente = ?';
    parameters = args.cedula ;
  }else{
    query += ' AND c.Fecha = ? ';
    parameters = args.cuando
  }

  console.log(parameters);
    db.all(query , parameters, async(err, data) => {
      if(err){
        console.log(err);
      }    
          
      data.forEach((row) => { 
        rows.push(row);
      })
      event.sender.send('return-consultas', rows);
    })
});

ipcMain.on('get-archivos', async(event, args) => {
  let archivos;
  db.all('SELECT a.Nombre FROM Archivos a, Consulta c WHERE c.Identificador = a.Consulta AND c.Identificador = ?', args.identificador, async(err, data) =>{
    if(err){
      console.log(err);
    }

    if(data.length === 0){
      archivos = "vacio"
    }else  {
      archivos = data;
    }

    event.sender.send('return-archivos', archivos);
  })
})

ipcMain.on('get-historia-clinica', async(event, arg) => {
  db.all('SELECT p.Nombre as Nombre, c.Fecha, c.Hora, c.Descripcion, c.Completada' +
  ' FROM Consulta c, Paciente p WHERE p.Cedula = c.Paciente AND c.Paciente LIKE ?', '%' + arg.cedula + '%', async(err, data) => {
    if(err){
    console.log('err')
  }      

  event.sender.send('return-historia', data);
  });
});

ipcMain.on('get-paciente', async(event, args) => {
  db.all('SELECT * FROM Paciente WHERE Nombre LIKE ? ', '%' + args.nombre + '%', (err, row) => {
    if(err){
      console.log(err);
    }

    event.sender.send('return-paciente', row);
  })
})

ipcMain.handle('delete-consulta', (_, args) => {
  let ret = true;
  db.serialize(() => {
    db.run('DELETE FROM Archivos WHERE Consulta = ?', args.identificador, (err) => {
      if(err){
        console.log(err);
        ret = false;
      }else{
        db.run('DELETE FROM Consulta WHERE Identificador = ?', args.identificador, (err) => {
          if(err){
            console.log(err);
            ret = false;
          }else{
            console.log('consulta con todo borrada');
          }
        });
      }
    })
  })
  return ret;
})


ipcMain.handle('post-agregar-consulta', (event, args) => {

  db.serialize(() => {    
    db.run('INSERT INTO Consulta(Identificador, Paciente, Descripcion, Tipo, Fecha, Hora, Costo, Completada) VALUES(?,?,?,?,?,?,?,?)',
    [args.consulta.identificador, args.consulta.cedula, args.consulta.descripcion, args.consulta.tipo, args.consulta.fecha, args.consulta.hora, args.consulta.costo, args.consulta.completada], (err) => {
     
      if(err){
        console.log(err);
        event.sender.send('return-conslta-agregada', 'Error agregando la consulta');        
      }else{

        //si pudo agregar la consulta que agregue los archivos tmb
        if(args.consulta.archivo.length > 0){
          args.consulta.archivo.map((a) => {
            db.run('INSERT INTO Archivos(Imagen, Nombre, Consulta) VALUES(?,?,?)', ['imagen', a.name, args.consulta.identificador], (err) => {
              if(err){
                console.log(err);
                event.sender.send('return-conslta-agregada', 'Error agregando imagen');
              }else{
                let trimedPath = a.path.split('\\');
                let shortedPath = trimedPath[trimedPath.length-3] + '\\' + trimedPath[trimedPath.length-2];        
        
                if(shortedPath != 'public\\imgs'){
                  let newPath = __dirname + '\\imgs\\' + a.name;
                  fs.rename(a.path, newPath, function(err) {
                    if(err) { 
                      console.log(err);
                      event.sender.send('return-conslta-agregada', 'Error agregando imagen');
                    }
                  })
                }    
                event.sender.send('return-conslta-agregada', 'Consulta agregada con exito');
              }
            })
          })
        }else{
          event.sender.send('return-conslta-agregada', 'Consulta agregada con exito');
        }  
      }
    })
  });
})

ipcMain.handle('post-archivos', async(event,args) => {
  args.archivos.map((a) => {
    db.run('INSERT INTO Archivos(Imagen, Nombre, Consulta) VALUES(?,?,?)', ['imagen', a, args.identificador], (err) => {
      if(err){
        console.log(err);
      }
    })
  })
})

ipcMain.handle('post-agregar-paciente', (event, args) => {
  db.run('INSERT INTO Paciente(Nombre, Telefono, Cedula) VALUES(?,?,?)', [args.nombre, args.telefono, args.cedula], (err) => {
    if(err){
      event.sender.send('return-paciente-agregado', false);
      console.log(err);
    }else{
      event.sender.send('return-paciente-agregado', true);
    }
  })
})

ipcMain.handle('update-consulta', async(event, args) => {

  let data = [args.cambios.Descripcion, args.cambios.Costo, args.cambios.Tipo, args.cambios.Identificador];
  console.log(data);
  db.run('UPDATE Consulta SET Descripcion = ?, Costo = ?, Tipo = ? WHERE Identificador = ?', data, (err) => {
    if(err){
      console.log(err);
    }
  });
})

// Loading a webpage inside the electron window we just created
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000' // Loading localhost if dev mode
      : `file://${path.join(__dirname, '../build/index.html')}` // Loading build file if in production
  );

	// Setting Window Icon - Asset file needs to be in the public/images folder.
  mainWindow.setIcon(path.join(__dirname, 'images/appicon.ico'));

	// In development mode, if the window has loaded, then load the dev tools.
  if (isDev) {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    });
  }
};

// ((OPTIONAL)) Setting the location for the userdata folder created by an Electron app. It default to the AppData folder if you don't set it.
app.setPath(
  'userData',
  isDev
    ? path.join(app.getAppPath(), 'userdata/') // In development it creates the userdata folder where package.json is
    : path.join(process.resourcesPath, 'userdata/') // In production it creates userdata folder in the resources folder
);

// When the app is ready to load
app.whenReady().then(async () => {
  await createWindow(); // Create the mainWindow

  // If you want to add React Dev Tools
  if (isDev) {
    await session.defaultSession
      .loadExtension(
        path.join(__dirname, `../userdata/extensions/react-dev-tools`) // This folder should have the chrome extension for React Dev Tools. Get it online or from your Chrome extensions folder.
      )
      .then((name) => console.log('Dev Tools Loaded'))
      .catch((err) => console.log(err));
  }
});

// Exiting the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Activating the app
app.on('activate', () => {
  if (mainWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Logging any exceptions
process.on('uncaughtException', (error) => {
  console.log(`Exception: ${error}`);
  if (process.platform !== 'darwin') {
    app.quit();
  }
});