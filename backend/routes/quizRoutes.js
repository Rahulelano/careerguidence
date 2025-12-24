import express from 'express';
import Quiz from '../models/Quiz.js';

const router = express.Router();

// Submit quiz results
router.post('/submit', async (req, res) => {
  try {
    const {
      totalScore,
      clarityLevel,
      answers,
      contactMethod,
      name,
      email,
      phone,
      ipAddress,
      userAgent
    } = req.body;

    // Validate required fields
    if (!totalScore || !clarityLevel || !answers || !contactMethod || !name) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    // Validate contact information - all 3 fields are now mandatory
    if (!email || !phone) {
      return res.status(400).json({
        message: 'Email and phone number are required'
      });
    }

    // Create new quiz submission
    const quizSubmission = new Quiz({
      totalScore,
      clarityLevel,
      answers,
      contactMethod,
      name,
      email,
      phone,
      ipAddress: ipAddress || req.ip,
      userAgent: userAgent || req.get('User-Agent')
    });

    // Save to database
    await quizSubmission.save();

    // Format quiz details for SMS
    const quizDetails = formatQuizDetailsForSMS(quizSubmission);

    // Send SMS to your number
    const smsSent = await sendSMSToNumber('9443690870', quizDetails);

    if (smsSent) {
      console.log('Quiz details sent to phone number successfully');
    } else {
      console.log('Failed to send SMS, but quiz saved to database');
    }

    res.status(201).json({
      message: 'Quiz submitted successfully',
      submissionId: quizSubmission._id,
      smsSent
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      message: 'Failed to submit quiz',
      error: error.message
    });
  }
});

// Get all quiz submissions (for admin)
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await Quiz.find({})
      .sort({ submittedAt: -1 })
      .limit(100);

    res.json(submissions);
  } catch (error) {
    console.error('Error fetching quiz submissions:', error);
    res.status(500).json({
      message: 'Failed to fetch quiz submissions',
      error: error.message
    });
  }
});

// Get quiz statistics
router.get('/stats', async (req, res) => {
  try {
    const totalSubmissions = await Quiz.countDocuments();
    const clarityLevels = await Quiz.aggregate([
      {
        $group: {
          _id: '$clarityLevel',
          count: { $sum: 1 }
        }
      }
    ]);

    const contactMethods = await Quiz.aggregate([
      {
        $group: {
          _id: '$contactMethod',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalSubmissions,
      clarityLevels,
      contactMethods,
      recentSubmissions: await Quiz.find({})
        .sort({ submittedAt: -1 })
        .limit(5)
        .select('totalScore clarityLevel contactMethod submittedAt')
    });
  } catch (error) {
    console.error('Error fetching quiz stats:', error);
    res.status(500).json({
      message: 'Failed to fetch quiz statistics',
      error: error.message
    });
  }
});

// Helper function to format quiz details for SMS
function formatQuizDetailsForSMS(quizSubmission) {
  const { totalScore, clarityLevel, contactMethod, name, email, phone, answers, submittedAt } = quizSubmission;

  let message = `🧠 NEW CAREER QUIZ SUBMISSION\n\n`;
  message += `👤 Name: ${name}\n`;
  message += `📊 Score: ${totalScore}/12\n`;
  message += `🎯 Clarity Level: ${clarityLevel}\n`;
  message += `📞 Contact Method: ${contactMethod.toUpperCase()}\n`;
  message += `📧 Email: ${email}\n`;
  message += `📱 Phone: ${phone}\n`;

  message += `\n📝 ANSWERS:\n`;
  answers.forEach((answer, index) => {
    message += `${index + 1}. ${answer.question.substring(0, 30)}... → ${answer.points}pts\n`;
  });

  message += `\n⏰ Submitted: ${submittedAt.toLocaleString('en-IN')}`;

  return message;
}

// Helper function to send SMS (you can integrate with SMS service like Twilio)
async function sendSMSToNumber(phoneNumber, message) {
  try {
    // For now, just log the message - ready for SMS service integration
    console.log(`\n=== SMS TO ${phoneNumber} ===`);
    console.log(message);
    console.log(`=== END SMS ===\n`);

    // Check if SMS service is configured
    const smsService = process.env.SMS_SERVICE;
    const smsApiKey = process.env.SMS_API_KEY;
    const smsApiSecret = process.env.SMS_API_SECRET;
    const fromNumber = process.env.SMS_FROM_NUMBER;

    if (!smsService || !smsApiKey || !smsApiSecret || !fromNumber) {
      console.log('SMS service not configured. Please set SMS_SERVICE, SMS_API_KEY, SMS_API_SECRET, and SMS_FROM_NUMBER environment variables.');
      console.log('Currently logging SMS instead of sending.');
      return true; // Return true so the quiz submission doesn't fail
    }

    // Example integration with Twilio (uncomment and configure when ready)
    /*
    if (smsService === 'twilio') {
      const twilio = require('twilio')(smsApiKey, smsApiSecret);
      await twilio.messages.create({
        body: message,
        from: fromNumber,
        to: phoneNumber
      });
    }
    */

    // Example integration with AWS SNS (uncomment and configure when ready)
    /*
    if (smsService === 'aws') {
      const AWS = require('aws-sdk');
      AWS.config.update({
        accessKeyId: smsApiKey,
        secretAccessKey: smsApiSecret,
        region: process.env.AWS_REGION || 'us-east-1'
      });
      const sns = new AWS.SNS();

      await sns.publish({
        Message: message,
        PhoneNumber: phoneNumber
      }).promise();
    }
    */

    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
}

export default router;