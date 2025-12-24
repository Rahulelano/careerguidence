import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    service: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ['contact', 'quiz', 'other'],
        default: 'contact'
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'resolved', 'closed'],
        default: 'new'
    }
}, {
    timestamps: true
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
