const express = require('express');
const router = express.Router();
const Wisata = require('../models/Wisata');

// GET semua wisata
router.get('/', async (req, res) => {
    try {
        const { category, city } = req.query;
        
        let query = { isActive: true };
        
        if (category) {
            query.category = category;
        }
        
        if (city) {
            query['location.city'] = city;
        }
        
        const wisata = await Wisata.find(query)
            .sort({ rating: -1 });
            
        res.json(wisata);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET wisata by id
router.get('/:id', async (req, res) => {
    try {
        const wisata = await Wisata.findById(req.params.id);
        if (!wisata) {
            return res.status(404).json({ message: 'Wisata tidak ditemukan' });
        }
        res.json(wisata);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST wisata baru
router.post('/', async (req, res) => {
    try {
        const wisata = new Wisata(req.body);
        await wisata.save();
        res.status(201).json(wisata);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update wisata
router.put('/:id', async (req, res) => {
    try {
        const wisata = await Wisata.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(wisata);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE wisata
router.delete('/:id', async (req, res) => {
    try {
        await Wisata.findByIdAndDelete(req.params.id);
        res.json({ message: 'Wisata berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rating wisata
router.post('/:id/rate', async (req, res) => {
    try {
        const { rating } = req.body;
        const wisata = await Wisata.findById(req.params.id);
        
        const total = wisata.totalRatings * wisata.rating + rating;
        wisata.totalRatings += 1;
        wisata.rating = total / wisata.totalRatings;
        
        await wisata.save();
        res.json({ rating: wisata.rating, totalRatings: wisata.totalRatings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;