import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  // Quiz Results
  totalScore: {
    type: Number,
    required: true
  },
  clarityLevel: {
    type: String,
    required: true,
    enum: ['High Clarity', 'Medium Clarity', 'Low Clarity']
  },
  answers: [{
    question: String,
    answer: String,
    points: Number
  }],

  // Contact Information
  contactMethod: {
    type: String,
    required: true,
    enum: ['email', 'phone', 'whatsapp']
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },

  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String
});

// Create indexes for better query performance
quizSchema.index({ submittedAt: -1 });
quizSchema.index({ clarityLevel: 1 });
quizSchema.index({ contactMethod: 1 });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;