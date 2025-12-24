import express from 'express';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// POST /api/inquiries - Create a new inquiry
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, service, message, type } = req.body;

        // Validation
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, email, and phone are required' });
        }

        const inquiry = new Inquiry({
            name,
            email,
            phone,
            service,
            message,
            type: type || 'contact'
        });

        const savedInquiry = await inquiry.save();
        res.status(201).json(savedInquiry);
    } catch (error) {
        console.error('Error creating inquiry:', error);
        res.status(500).json({ message: 'Error submitting inquiry', error: error.message });
    }
});

// GET /api/inquiries - Get all inquiries (Admin?)
// Probably need authentication here later, but for now simple list
router.get('/', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inquiries' });
    }
});

export default router;
