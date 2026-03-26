const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Homepage = require('../models/Homepage');

// @desc    Get homepage data
// @route   GET /api/homepage
// @access  Public
router.get('/', async (req, res) => {
    try {
        let homepage = await Homepage.findOne();
        
        // If no homepage data exists, create default
        if (!homepage) {
            homepage = await Homepage.create({});
        }
        
        res.status(200).json({
            success: true,
            data: homepage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data homepage',
            error: error.message
        });
    }
});

// @desc    Update homepage data
// @route   PUT /api/homepage
// @access  Private (Admin only)
router.put('/', protect, authorize('admin'), async (req, res) => {
    try {
        let homepage = await Homepage.findOne();
        
        if (!homepage) {
            homepage = await Homepage.create(req.body);
        } else {
            homepage = await Homepage.findOneAndUpdate(
                {},
                { ...req.body, updatedAt: Date.now() },
                { new: true, runValidators: true }
            );
        }
        
        res.status(200).json({
            success: true,
            message: 'Homepage berhasil diperbarui',
            data: homepage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui homepage',
            error: error.message
        });
    }
});

// @desc    Update hero section
// @route   PUT /api/homepage/hero
// @access  Private (Admin only)
router.put('/hero', protect, authorize('admin'), async (req, res) => {
    try {
        const homepage = await Homepage.findOne();
        
        if (!homepage) {
            return res.status(404).json({
                success: false,
                message: 'Homepage tidak ditemukan'
            });
        }
        
        homepage.hero = { ...homepage.hero, ...req.body };
        await homepage.save();
        
        res.status(200).json({
            success: true,
            message: 'Hero section berhasil diperbarui',
            data: homepage.hero
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui hero section',
            error: error.message
        });
    }
});

// @desc    Update eksplorasi section
// @route   PUT /api/homepage/eksplorasi
// @access  Private (Admin only)
router.put('/eksplorasi', protect, authorize('admin'), async (req, res) => {
    try {
        const homepage = await Homepage.findOne();
        
        if (!homepage) {
            return res.status(404).json({
                success: false,
                message: 'Homepage tidak ditemukan'
            });
        }
        
        homepage.eksplorasi = { ...homepage.eksplorasi, ...req.body };
        await homepage.save();
        
        res.status(200).json({
            success: true,
            message: 'Eksplorasi section berhasil diperbarui',
            data: homepage.eksplorasi
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui eksplorasi section',
            error: error.message
        });
    }
});

// @desc    Update statistik section
// @route   PUT /api/homepage/statistik
// @access  Private (Admin only)
router.put('/statistik', protect, authorize('admin'), async (req, res) => {
    try {
        const homepage = await Homepage.findOne();
        
        if (!homepage) {
            return res.status(404).json({
                success: false,
                message: 'Homepage tidak ditemukan'
            });
        }
        
        homepage.statistik = { ...homepage.statistik, ...req.body };
        await homepage.save();
        
        res.status(200).json({
            success: true,
            message: 'Statistik section berhasil diperbarui',
            data: homepage.statistik
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui statistik section',
            error: error.message
        });
    }
});

// @desc    Update ulos feature section
// @route   PUT /api/homepage/ulos-feature
// @access  Private (Admin only)
router.put('/ulos-feature', protect, authorize('admin'), async (req, res) => {
    try {
        const homepage = await Homepage.findOne();
        
        if (!homepage) {
            return res.status(404).json({
                success: false,
                message: 'Homepage tidak ditemukan'
            });
        }
        
        homepage.ulosFeature = { ...homepage.ulosFeature, ...req.body };
        await homepage.save();
        
        res.status(200).json({
            success: true,
            message: 'Ulos feature section berhasil diperbarui',
            data: homepage.ulosFeature
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui ulos feature section',
            error: error.message
        });
    }
});

// @desc    Update footer section
// @route   PUT /api/homepage/footer
// @access  Private (Admin only)
router.put('/footer', protect, authorize('admin'), async (req, res) => {
    try {
        const homepage = await Homepage.findOne();
        
        if (!homepage) {
            return res.status(404).json({
                success: false,
                message: 'Homepage tidak ditemukan'
            });
        }
        
        homepage.footer = { ...homepage.footer, ...req.body };
        await homepage.save();
        
        res.status(200).json({
            success: true,
            message: 'Footer section berhasil diperbarui',
            data: homepage.footer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui footer section',
            error: error.message
        });
    }
});

// @desc    Update SEO
// @route   PUT /api/homepage/seo
// @access  Private (Admin only)
router.put('/seo', protect, authorize('admin'), async (req, res) => {
    try {
        const homepage = await Homepage.findOne();
        
        if (!homepage) {
            return res.status(404).json({
                success: false,
                message: 'Homepage tidak ditemukan'
            });
        }
        
        homepage.seo = { ...homepage.seo, ...req.body };
        await homepage.save();
        
        res.status(200).json({
            success: true,
            message: 'SEO berhasil diperbarui',
            data: homepage.seo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui SEO',
            error: error.message
        });
    }
});

module.exports = router;