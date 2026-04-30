require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const mongoose = require('mongoose');
const path = require('path');
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

  //Connecting to MongoDB Atlas
  mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
      console.log('Hooray! MongoDB Atlas connected successfully!');

      //Checking if the students collection is empty and add a test student if it is
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
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});