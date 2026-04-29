const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  // --- student's personal info ---
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true }, // "89012"
  degree: { type: String, default: "B.Sc. Computer Science" },
  semester: { type: String, default: "Spring 2026" },
  group: { type: String, default: "INLS2_28" },
  personalEmail: { type: String, required: true, unique: true },
  universityEmail: { type: String },
  specialization: { type: String, default: "Software Engineering" },
  currentYear: { type: String, default: "Year 3" },

  // --- progress tracker ---
  progress: { type: Number, default: 0 }, // Displays in the progress bar
  lastActivity: { type: Date, default: Date.now },

  // --- GITHUB and statistics ---
  githubUsername: { type: String }, // E.g. "@alexdev47"
  githubStats: {
    publicRepos: { type: Number, default: 0 },
    lastCommit: { type: String, default: "Немає даних" }
  },

  // --- CODE REVIEW ---
  codeReview: {
    content: { type: String, default: "Тут з'явиться аналіз вашого останнього коду..." },
    rating: { type: String, default: "—" }, // рейт (A, B+, C тощо)
    suggestions: { type: [String], default: [] }, //advice for improvement from AI
    updatedAt: { type: Date, default: Date.now }
  }
});

module.exports = mongoose.model('Student', StudentSchema);