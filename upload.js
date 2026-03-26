const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ============================================
// PASTIKAN FOLDER UPLOADS ADA
// ============================================
const uploadDir = path.join(__dirname, '../uploads/homepage');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('✅ Folder uploads/homepage dibuat');
}

// ============================================
// KONFIGURASI STORAGE
// ============================================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'ulos-' + uniqueSuffix + ext);
    }
});

// Filter file (hanya gambar)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Hanya file gambar yang diperbolehkan!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: fileFilter
});

// ============================================
// FUNGSI BACA DATA HOMEPAGE
// ============================================
const DATA_FILE = path.join(__dirname, '../data/homepage.json');

function readHomepageData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error membaca data:', error);
    }
    return {};
}

function saveHomepageData(data) {
    try {
        const dataDir = path.join(__dirname, '../data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error menyimpan data:', error);
        return false;
    }
}

// ============================================
// ENDPOINT UPLOAD HERO
// ============================================
router.post('/hero', upload.single('image'), (req, res) => {
    console.log('📤 Upload hero dimulai...');
    
    try {
        if (!req.file) {
            console.log('❌ Tidak ada file');
            return res.status(400).json({ 
                success: false, 
                message: 'Tidak ada file yang diupload' 
            });
        }

        console.log('✅ File diterima:', req.file.originalname);
        console.log('📁 Disimpan di:', req.file.path);

        const filePath = '/uploads/homepage/' + req.file.filename;
        
        // Baca data yang sudah ada
        let data = readHomepageData();
        
        // Update data hero
        data.hero = data.hero || {};
        data.hero.imageUrl = filePath;
        
        // Simpan kembali
        saveHomepageData(data);
        
        console.log('💾 Data tersimpan di:', DATA_FILE);
        console.log('✅ Upload hero selesai!');

        res.json({
            success: true,
            message: 'Gambar hero berhasil diupload!',
            filePath: filePath,
            filename: req.file.filename
        });

    } catch (error) {
        console.error('❌ Upload error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Gagal upload: ' + error.message 
        });
    }
});

// ============================================
// ENDPOINT UPLOAD ULOS FEATURE
// ============================================
router.post('/ulos-feature', upload.single('image'), (req, res) => {
    console.log('📤 Upload ulos feature dimulai...');
    
    try {
        if (!req.file) {
            console.log('❌ Tidak ada file');
            return res.status(400).json({ 
                success: false, 
                message: 'Tidak ada file yang diupload' 
            });
        }

        console.log('✅ File diterima:', req.file.originalname);
        console.log('📁 Disimpan di:', req.file.path);

        const filePath = '/uploads/homepage/' + req.file.filename;
        
        // Baca data yang sudah ada
        let data = readHomepageData();
        
        // Update data ulosFeature
        data.ulosFeature = data.ulosFeature || {};
        data.ulosFeature.imageUrl = filePath;
        
        // Simpan kembali
        saveHomepageData(data);
        
        console.log('💾 Data tersimpan di:', DATA_FILE);
        console.log('✅ Upload ulos feature selesai!');

        res.json({
            success: true,
            message: 'Gambar ulos feature berhasil diupload!',
            filePath: filePath,
            filename: req.file.filename
        });

    } catch (error) {
        console.error('❌ Upload error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Gagal upload: ' + error.message 
        });
    }
});

// ============================================
// ENDPOINT TEST
// ============================================
router.get('/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Upload route is working',
        uploadDir: uploadDir,
        dataFile: DATA_FILE,
        timestamp: new Date()
    });
});

module.exports = router;