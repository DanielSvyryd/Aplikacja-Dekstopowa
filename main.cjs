const { app, BrowserWindow } = require('electron');
const mongoose = require('mongoose');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL('http://localhost:5173'); 
}

app.whenReady().then(() => {
  createWindow();

  // Connecting to MongoDB in Docker
  mongoose.connect('mongodb://localhost:27017/student_tracker')
    .then(() => console.log('Hooray! MongoDB connected successfully!'))
    .catch(err => console.error('Damn! Database connection failed:', err));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});