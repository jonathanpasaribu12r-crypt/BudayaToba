const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET semua events
router.get('/', async (req, res) => {
    try {
        const { month, year, category } = req.query;
        
        let query = {};
        
        if (category) {
            query.category = category;
        }
        
        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);
            query.startDate = { $gte: startDate, $lte: endDate };
        }
        
        const events = await Event.find(query)
            .sort({ startDate: 1 });
            
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET event by id
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event tidak ditemukan' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST event baru
router.post('/', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update event
router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE event
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET featured events
router.get('/featured/now', async (req, res) => {
    try {
        const now = new Date();
        const events = await Event.find({
            isFeatured: true,
            endDate: { $gte: now }
        }).sort({ startDate: 1 }).limit(5);
        
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
