const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// GET semua gallery
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        
        let query = {};
        if (category) {
            query.category = category;
        }
        
        const gallery = await Gallery.find(query)
            .sort({ createdAt: -1 });
            
        res.json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single gallery item
router.get('/:id', async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Gambar tidak ditemukan' });
        }
        
        // Tambah views
        item.views += 1;
        await item.save();
        
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST gallery baru
router.post('/', async (req, res) => {
    try {
        const gallery = new Gallery(req.body);
        await gallery.save();
        res.status(201).json(gallery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update gallery
router.put('/:id', async (req, res) => {
    try {
        const gallery = await Gallery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(gallery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE gallery
router.delete('/:id', async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Gambar berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Like gambar
router.post('/:id/like', async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);
        gallery.likes += 1;
        await gallery.save();
        res.json({ likes: gallery.likes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;