const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// GET semua artikel
router.get('/', async (req, res) => {
    try {
        const { category, page = 1, limit = 10 } = req.query;
        
        let query = {};
        if (category) {
            query.category = category;
        }
        
        const articles = await Article.find(query)
            .populate('author', 'name')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await Article.countDocuments(query);
        
        res.json({
            articles,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET artikel by slug
router.get('/:slug', async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug })
            .populate('author', 'name');
            
        if (!article) {
            return res.status(404).json({ message: 'Artikel tidak ditemukan' });
        }
        
        // Tambah views
        article.views += 1;
        await article.save();
        
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST artikel baru
router.post('/', async (req, res) => {
    try {
        const article = new Article(req.body);
        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update artikel
router.put('/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        res.json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE artikel
router.delete('/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: 'Artikel berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;