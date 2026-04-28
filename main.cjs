const { app, BrowserWindow } = require('electron');
const mongoose = require('mongoose');
const Student = require('./models/student.model.cjs');

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

  //Connecting to MongoDB in Docker
  mongoose.connect('mongodb://localhost:27017/student_tracker')
    .then(async () => {
      console.log('Hooray! MongoDB connected successfully!');

      //Checking if the students collection is empty and add a test student if it is
      const count = await Student.countDocuments();
      
      if (count === 0) {
        console.log('Database is empty. Adding a test student...');
        await Student.create({
          name: "Mr.Robot",
          email: "mr.robot@example.com",
          progress: 45
        });
        console.log('Test student added successfully!');
      } else {
        console.log(`Amount of students in the database: ${count}`);
      }
    })
    .catch(err => console.error('Damn! Database connection failed:', err));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});