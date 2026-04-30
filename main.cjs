require('dotenv').config();
const { app, BrowserWindow, globalShortcut, ipcMain, Tray, Menu, nativeImage } = require('electron');
const mongoose = require('mongoose');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Student = require('./models/student.model.cjs');

// key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let mainWin;   
let helperWin;
let tray;    

function createMainWindow() {
    mainWin = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            nodeIntegration: false,
            contextIsolation: true 
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

    // ensuring that index.html for helper exists!
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

// Handle requests to fetch the list of students
ipcMain.handle('get-students', async () => {
  try {
    const students = await Student.find(); 
    // Convert Mongoose data to clean JSON for transfer
    return JSON.parse(JSON.stringify(students));
  } catch (err) {
    console.error('Failed to fetch students:', err);
    return [];
  }
});

app.whenReady().then(() => {
    createMainWindow();
    createHelperWindow();

    //Cloud database connection
    mongoose.connect(process.env.MONGO_URI)
        .then(async () => {
            console.log('Hooray! MongoDB Atlas connected successfully!');
            const count = await Student.countDocuments();
            if (count === 0) {
                console.log('Database is empty. Adding a test student...');
                await Student.create({
                    name: "Mr.Robot",
                    studentId: "fsociety-01",
                    personalEmail: "mr.robot@example.com",
                    universityEmail: "elliot.a@student.gdansk.merito.pl",
                    progress: 65,
                    githubUsername: "@elliot_alderson",
                    githubStats: {
                        publicRepos: 12,
                        lastCommit: "Today at 03:00 AM"
                    },
                    codeReview: {
                        content: "The code looks decent, but the architecture requires some refactoring. Pay attention to database query optimization.",
                        rating: "73/100",
                        suggestions: [
                            "Use 'const' instead of 'let' wherever possible", 
                            "Hide secret keys in the .env file"
                        ]
                    }
                });
                console.log('Test student added successfully!');
            } else {
                console.log(`Amount of students in the database: ${count}`);
            }
        })
        .catch(err => console.error('Damn! Database connection failed:', err));

    // Keyboard shortcuts
    globalShortcut.register('Alt+Space', () => {
        if (helperWin.isVisible()) {
            helperWin.hide();
        } else {
            helperWin.show();
            helperWin.focus();
        }
    });

    //Safe tray icon setup
    try {
        const iconPath = path.join(__dirname, 'icon.png'); 
        const icon = nativeImage.createFromPath(iconPath); 
        tray = new Tray(icon);
        const contextMenu = Menu.buildFromTemplate([
            { label: 'Open tracker', click: () => mainWin.show() },
            { label: 'Helper (Alt+Space)', click: () => helperWin.show() },
            { type: 'separator' },
            { label: 'Exit', click: () => app.quit() }
        ]);
        tray.setContextMenu(contextMenu);
    } catch (e) {
        console.log("Tray icon not found. Make sure you have 'icon.png' in the root directory.");
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});