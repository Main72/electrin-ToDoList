
// Modules to control application life and create native browser window
const exp = require('constants');
const { app, BrowserWindow, Menu, screen, globalShortcut } = require('electron');
const path = require('path');
const { electron } = require('process');




const createWindow = () => {
  
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x:  300,
    y: 150,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 30,
      width: 100,
    },
    // titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    
    }
    
  })
  require("@electron/remote/main").initialize();
  require("@electron/remote/main").enable(mainWindow.webContents);


  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.setMenu(null);
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  // mainWindow.on('resized', function() {
  //   //mainWindow.setPosition(width-25,400);
  //   mainWindow.setSize(400,400);

  // });
  mainWindow.on('closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
  
  
  
console.log(screen.getPrimaryDisplay().workAreaSize);
  //--------------------------------------DevTools---------------//
  // Open the DevTools.
   mainWindow.webContents.openDevTools()
  //--------------------------------------DevTools---------------//
}




const createAddWindow = () => {

  const addWindow = new BrowserWindow({
        width: 350,
        height: 500,
        opacity: 0.6,    
        titleBarStyle: 'hidden',
        webPreferences: {
          preload: path.join(__dirname, ''),
          
        },
        
          
        

        
            
        
        
      })
      addWindow.setResizable(false);
    
    
      // and load the index.html of the app.
      addWindow.loadFile('indexAddWindow.html')
      addWindow.setMenu(null);

      //------------FullWidnow without any program name
      //addWindow.kiosk = true;
      //------------------Can be closed or not
      // addWindow.closable =  true;
      //----------------If backgroundThrottling is disabled, the visibility state will remain visible even if the window is minimized, occluded, or hidden.
      //addWindow.webContents.backgroundThrottling=false;
      //addWindow.showInactive();
      addWindow.hide();
      
      setTimeout(()=>addWindow.show(),100)
      addWindow.setAlwaysOnTop(true, "floating");
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width, height } = primaryDisplay.workAreaSize;
      addWindow.setPosition(width-600,height-height+400);
      console.log( addWindow.isVisible())
      globalShortcut.register('Ctrl+Tab', () => {
        console.log('a');
        if(addWindow.isVisible())
        {
          addWindow.setAlwaysOnTop(false, "floating");
          addWindow.hide();
        }
        else{
          addWindow.setAlwaysOnTop(true, "floating");
          addWindow.show();
        }
  
        
      
      })

  //--------------------------------------DevTools---------------//
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  //--------------------------------------DevTools---------------//
      
}




// const addMenuTemplate =[
//   {
      
//       accelerator:process.platform == 'darwin' ?'Command+Q':'Shift+R',
//       click(){
//         addWindow.setAlwaysOnTop(false, "floating");
//         addWindow.hide();
//       }
//   }
//]





const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            // {
            //     label:'GG',
            //     accelerator:process.platform == 'darwin' ?'Command+Q':'Shift+R',
            //     click(){
            //       addWindow.setAlwaysOnTop(false, "floating");
            //       addWindow.hide();
            //     }
            // },
            {
                label:'Start',
                accelerator:process.platform == 'darwin' ?'Command+Q':'Shift+R',
                click(){
                    createAddWindow();
                    
                }
            },
            // {
            //     label:'B',
            //     click(){
            //       addWindow.show();
            //   }
            // },
            {
                label:'Quit',
                accelerator:process.platform == 'darwin' ?'Command+Q':'Alt+F4',
                click(){
                    app.quit();
                }
            }
        ]
    }
]
    
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()


  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
//



