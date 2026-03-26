const mongoose = require('mongoose');

const WisataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    location: {
        address: String,
        city: String,
        province: {
            type: String,
            default: 'Sumatera Utara'
        },
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    category: {
        type: String,
        enum: ['alam', 'sejarah', 'budaya', 'religi', 'kuliner'],
        required: true
    },
    images: [String],
    video: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    facilities: [String],
    ticketPrice: {
        adult: Number,
        child: Number,
        foreign: Number
    },
    openingHours: {
        open: String,
        close: String
    },
    contact: {
        phone: String,
        email: String,
        website: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Wisata', WisataSchema);