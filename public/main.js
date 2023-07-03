const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

var win;

const createWindow = async () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        // backgroundColor: '#080808',
        title: 'keyDefender', //For title
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: 'rgba(255, 255, 255, 0)',
            symbolColor: '#030303',
        }
        // titleBarOverlay: true
    })
    win.maximize();
    // win.loadFile('homePage.html');
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )
    win.on('closed', () => {
        win = null;
        app.quit();
    })
}

app.whenReady().then(() => {
    createWindow()
})

ipcMain.on('updateMessage', (event) => {
    const options = {
        type: 'question',
        buttons: ['Cancel', 'OK'],
        defaultId: 1,
        title: 'Update',
        message: 'URL already exists',
        detail: 'Do you want to Update ?',
    };

    dialog.showMessageBox(null, options).then(box => {
        event.sender.send('updateMessage', box.response)
    })
})

ipcMain.on('invalidPass', (event) => {
    const options = {
        type: 'info',
        buttons: ['OK'],
        defaultId: 0,
        title: 'Invalid ',
        message: 'Incorrect credentials',
        detail: 'Please check and try again',
    };

    dialog.showMessageBox(null, options).then(box => {
        // event.sender.send('updateMessage',box.response)
    })
})
