const { app, BrowserWindow, globalShortcut, ipcMain, Tray, Menu, nativeImage } = require('electron');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("APi");

let mainWin;   
let helperWin;
let tray;    


function createMainWindow() {
    mainWin = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false 
        },
    });

    mainWin.loadURL('http://localhost:5173'); 
}


function createHelperWindow() {
    helperWin = new BrowserWindow({
        width: 500,
        height: 150, 
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        transparent: true,
        show: false, 
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    helperWin.loadFile('index.html');

    helperWin.on('blur', () => {
        helperWin.hide();
    });
}
async function askAI(prompt) {
    try {

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (err) {
        return "Error: " + err.message;
    }
}


app.whenReady().then(() => {
    
    createMainWindow();
    createHelperWindow();


    mongoose.connect('mongodb://localhost:27017/student_tracker')
        .then(() => console.log('Hooray! MongoDB connected successfully!'))
        .catch(err => console.error('Database connection failed:', err));

    
    globalShortcut.register('Alt+Space', () => {
        if (helperWin.isVisible()) {
            helperWin.hide();
        } else {
            helperWin.show();
            helperWin.focus();
        }
    });

   
    const icon = nativeImage.createFromPath('path/to/icon.png'); 
    tray = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open tracker', click: () => mainWin.show() },
        { label: 'Helper (Alt+Space)', click: () => helperWin.show() },
        { type: 'separator' },
        { label: 'Exit', click: () => app.quit() }
    ]);
    tray.setContextMenu(contextMenu);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

