const remote = require('@electron/remote');
const { app, BrowserWindow, Menu, screen, globalShortcut } = remote;




let starsAll = [];
function stars()
{ 
    let scene = document.querySelector('.scene');
    for(let i=0;i<500;i++)
    {
       
        let star = document.createElement('i');
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let size = Math.random() * 2;
        let duration = Math.random() * 10;
        

        // star.cssText =`
        //     left: ${x}px;
        // `
        star.style.left =x+'px';
        star.style.top =y+'px';
        star.style.width =size+'px';
        star.style.height =size+'px';
        star.style.animationDuration =5 + duration + 's';
        star.style.animationDelay = duration + 's';

        starsAll.push(star);

        scene.appendChild(star);
       
       
    }

}
function clearStars()
{
    if(starsAll.length===0)return;
    let scene = document.querySelector('.scene');
    for(let i=0;i<starsAll.length;i++)
    {
       scene.removeChild(starsAll[i]) ;
       
    }
    starsAll=[];
}
function toggleScene(){
   
  let change = document.querySelector('.scene');
  change.classList.toggle('active');

}


stars();



//---------------------------------------------------Electron-------------------------------------------

const startBtn = document.getElementById('startBtn')
const createAddWindow = () => {

  const addWindow = new BrowserWindow({
        width: 350,
        height: 500,
        opacity: 0.6,    
        titleBarStyle: 'hidden',
        webPreferences: {
          
  
          
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
      // addWindow.on('closed', () => {
      //   if (process.platform !== 'darwin') app.quit()
      // })




  //--------------------------------------DevTools---------------//
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  //--------------------------------------DevTools---------------//
      
}

startBtn.addEventListener('click',function(event){

  createAddWindow();

})




