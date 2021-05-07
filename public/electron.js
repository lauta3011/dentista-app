const { app, BrowserWindow, ipcMain } = require('electron'); // electron
const isDev = require('electron-is-dev'); // To check if electron is in development mode
const path = require('path');
const sqlite3 = require('sqlite3');

let mainWindow;

// Initializing a new database
const db = new sqlite3.Database(
  isDev
    ? path.join(__dirname, '../db/database.db') // my root folder if in dev mode
    : path.join(process.resourcesPath, 'db/database.db'), // the resources path if in production build
  (err) => {
    if (err) {
      console.log(`Database Error: ${err}`);
    } else {
      console.log('Database Loaded');
    }
  }
);

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

ipcMain.on('get-consultas', async(event, arg) => {
  let rows = [];
  db.all('SELECT p.Nombre as Nombre, c.Fecha, c.Hora, c.Descripcion, c.Completada, c.Costo, c.Identificador' +
  ' FROM Consulta c, Paciente p WHERE p.Cedula = c.Paciente ORDER BY Paciente', [], async(err, data) => {
  if(err){
    console.log(err);
  }    

  data.forEach((row) => { 
    rows.push(row);
  })
    event.sender.send('return-consultas', rows);
  });
});

ipcMain.on('get-archivos', async(event, args) => {
  db.all('SELECT a.Nombre FROM Archivos a, Consulta c WHERE c.Identificador = a.Consulta AND c.Identificador = ?', args.identificador, async(err, data) =>{
    if(err){
      console.log(err);
    }
    console.log(args.identificador);
    console.log(data);

    event.sender.send('return-archivos', data);
  })
})

ipcMain.on('get-historia-clinica', async(event, arg) => {
  let rows = [];
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

ipcMain.handle('post-agregar-consulta', (_, args) => {
  
  db.serialize(() => {
    db.run('INSERT INTO Consulta(Identificador, Paciente, Descripcion, Tipo, Fecha, Hora, Costo, Completada) VALUES(?,?,?,?,?,?,?,?)',
     [args.consulta.identificador, args.consulta.cedula, args.consulta.descripcion, args.consulta.tipo, args.consulta.fecha, args.consulta.hora, args.consulta.costo, true], (err) => {
      if(err){
        console.log(err);
      }
      console.log('consulta agregada! ');
    })
    
    if(args.archivo !== ''){
      db.run('INSERT INTO Archivos(Imagen, Nombre, Consulta) VALUES(?,?,?)', ['imagen', args.consulta.archivo, args.consulta.identificador], (err) => {
            if(err){
              console.log(err);
            }
            console.log('agrego archivo');
        })
    }
  });
  console.log('tudo bom');
})

ipcMain.handle('post-archivos', async(event,args) => {
  db.run('INSERT INTO Archivos(Nombre, Consulta) VALUES(?,?)', [args.Nombre, 4], (err) => {
    if(err){
      console.log(err);
    }

    console.log('agrego archivo');
    return 'arcvhivo agregado'
  })
})

ipcMain.handle('post-agregar-paciente', (event, args) => {
  db.run('INSERT INTO Paciente(Nombre, Telefono, Cedula) VALUES(?,?,?)', [args.nombre, args.telefono, args.cedula], (err) => {
    if(err){
      console.log(err);
    }
    console.log('row agregada!');
    return 'agregado man'
  })
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