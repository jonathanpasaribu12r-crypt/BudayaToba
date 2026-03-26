const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    title_en: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['festival', 'upacara', 'pertunjukan', 'workshop'],
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    contact: {
        phone: String,
        email: String,
        website: String
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    participants: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', EventSchema);