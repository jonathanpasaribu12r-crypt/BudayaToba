const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Homepage = require('../models/Homepage');

// Konfigurasi storage untuk upload gambar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = 'uploads/homepage/';
        
        // Buat folder jika belum ada
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'ulos-' + uniqueSuffix + ext);
    }
});

// Filter file yang diizinkan
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Hanya file gambar yang diperbolehkan (jpg, png, gif, webp)'));
    }
};

// Upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
}).single('image');

// @desc    Upload gambar hero (ulos)
// @route   POST /api/upload/hero
// @access  Private (Admin only)
exports.uploadHeroImage = (req, res) => {
    upload(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: 'Error upload: ' + err.message
            });
        } else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Tidak ada file yang diupload'
            });
        }

        // Cek apakah user ada (dari middleware auth)
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User tidak ditemukan. Silakan login ulang.'
            });
        }

        try {
            // Update database dengan path gambar baru
            let homepage = await Homepage.findOne();
            
            if (!homepage) {
                homepage = await Homepage.create({});
            }
            
            // Update imageUrl
            homepage.hero.imageUrl = '/uploads/homepage/' + req.file.filename;
            await homepage.save();

            res.status(200).json({
                success: true,
                message: 'Gambar berhasil diupload',
                filePath: '/uploads/homepage/' + req.file.filename,
                filename: req.file.filename
            });
        } catch (error) {
            console.error('Error saving to database:', error);
            res.status(500).json({
                success: false,
                message: 'Gagal menyimpan ke database',
                error: error.message
            });
        }
    });
};

// @desc    Upload gambar ulos feature
// @route   POST /api/upload/ulos-feature
// @access  Private (Admin only)
exports.uploadUlosFeatureImage = (req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Tidak ada file yang diupload'
            });
        }

        // Cek apakah user ada
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User tidak ditemukan. Silakan login ulang.'
            });
        }

        try {
            let homepage = await Homepage.findOne();
            
            if (!homepage) {
                homepage = await Homepage.create({});
            }
            
            homepage.ulosFeature.imageUrl = '/uploads/homepage/' + req.file.filename;
            await homepage.save();

            res.status(200).json({
                success: true,
                message: 'Gambar berhasil diupload',
                filePath: '/uploads/homepage/' + req.file.filename
            });
        } catch (error) {
            console.error('Error saving to database:', error);
            res.status(500).json({
                success: false,
                message: 'Gagal menyimpan ke database',
                error: error.message
            });
        }
    });
};

// @desc    Hapus gambar
// @route   DELETE /api/upload/:filename
// @access  Private (Admin only)
exports.deleteImage = async (req, res) => {
    try {
        // Cek apakah user ada
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User tidak ditemukan. Silakan login ulang.'
            });
        }

        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../uploads/homepage/', filename);

        // Hapus file jika ada
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.status(200).json({
            success: true,
            message: 'Gambar berhasil dihapus'
        });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus gambar',
            error: error.message
        });
    }
};