const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();

// Import routes
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// API ROUTES (HARUS SEBELUM STATIC FILES)
// ============================================
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================
// DATA HOMEPAGE (JSON FILE)
// ============================================
const DATA_FILE = path.join(__dirname, 'data', 'homepage.json');

function readHomepageData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error membaca data:', error);
    }
    return {
        hero: {
            badgeText: 'ᯂᯬᯒᯘ᯲',
            welcomeText: 'Horas! Selamat Datang',
            title: 'Jelajahi Kekayaan Budaya Batak',
            description: 'Temukan keindahan tradisi, seni, kuliner, dan warisan budaya Batak yang memperkaya Indonesia.',
            button1Text: 'Mulai Perjalanan',
            button1Link: '#eksplorasi',
            button2Text: 'Tonton Video',
            button2Link: '#video-section',
            imageTag: 'Ulos Batak',
            stats: [
                { number: '300+', label: 'Marga Batak' },
                { number: '50+', label: 'Jenis Ulos' },
                { number: '100+', label: 'Situs Budaya' }
            ]
        }
    };
}

function saveHomepageData(data) {
    try {
        const dataDir = path.join(__dirname, 'data');
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
// API ENDPOINTS HOMEPAGE
// ============================================
app.get('/api/homepage', (req, res) => {
    const data = readHomepageData();
    res.json({ success: true, data });
});

app.put('/api/homepage', (req, res) => {
    try {
        saveHomepageData(req.body);
        res.json({ success: true, message: 'Data homepage berhasil disimpan!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/test', (req, res) => {
    res.json({
        message: 'API Budaya Batak berjalan dengan baik',
        status: 'online',
        timestamp: new Date()
    });
});

// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, 'admin-panel')));

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Handle root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 404 handler
app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        res.status(404).json({ 
            success: false, 
            message: 'API endpoint tidak ditemukan' 
        });
    } else {
        res.status(404).send('Halaman tidak ditemukan');
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server berjalan di http://localhost:${PORT}`);
    console.log(`📁 Data file: ${DATA_FILE}`);
    console.log(`📁 Routes tersedia:`);
    console.log(`   - POST /api/upload/hero`);
    console.log(`   - POST /api/upload/ulos-feature`);
    console.log(`   - POST /api/auth/login`);
    console.log(`   - GET  /api/auth/test`);
    console.log(`   - GET  /api/homepage`);
    console.log(`   - PUT  /api/homepage`);
});