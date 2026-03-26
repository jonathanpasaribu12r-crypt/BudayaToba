const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ========== SERVE STATIC FILES ==========
// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));
// Serve admin panel (ada di folder backend/admin-panel)
app.use('/admin', express.static(path.join(__dirname, 'admin-panel')));
// Serve uploads folder
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// ========== MULTER UPLOAD CONFIGURATION ==========
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('File harus berupa gambar'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

// ========== KONEKSI MONGODB ==========
mongoose.connect('mongodb://localhost:27017/budaya_batak')
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err.message));

// ========== SCHEMA HOMEPAGE ==========
const homepageSchema = new mongoose.Schema({
    lastUpdated: { type: Date, default: Date.now },
    hero: {
        badgeText: { type: String, default: 'ᯂᯬᯒᯘ᯲' },
        welcomeText: { type: String, default: 'Horas! Selamat Datang' },
        title: { type: String, default: 'Jelajahi Kekayaan Budaya Batak' },
        description: { type: String, default: 'Temukan keindahan tradisi, seni, kuliner, dan warisan budaya Batak yang memperkaya Indonesia.' },
        button1Text: { type: String, default: 'Mulai Perjalanan' },
        button1Link: { type: String, default: '#eksplorasi' },
        button2Text: { type: String, default: 'Tonton Video' },
        button2Link: { type: String, default: '#video-section' },
        imageTag: { type: String, default: 'Ulos Batak' },
        imageUrl: { type: String, default: '' },
        stats: [{
            number: String,
            label: String
        }]
    },
    eksplorasi: {
        subtitle: { type: String, default: 'Kearifan Lokal' },
        title: { type: String, default: 'Eksplorasi Budaya Batak' },
        description: { type: String, default: 'Pelajari berbagai aspek budaya Batak melalui kategori berikut:' },
        cards: [{
            icon: String,
            title: String,
            description: String,
            link: String,
            linkText: String
        }]
    },
    statistik: {
        items: [{
            number: String,
            label: String,
            description: String
        }]
    },
    ulosFeature: {
        subtitle: { type: String, default: 'Kain Sakral Batak' },
        title: { type: String, default: 'Filosofi Ulos' },
        quote: { type: String, default: 'Ijuk pangihot ni hodong, ulos pangihot ni holong' },
        description: { type: String, default: 'Ulos bukan sekadar kain tenun biasa. Dalam falsafah hidup orang Batak, Ulos melambangkan kasih sayang, restu, perlindungan, dan ikatan batin.' },
        buttonText: { type: String, default: 'Pelajari Tentang Ulos' },
        buttonLink: { type: String, default: 'ulos.html' },
        imageUrl: { type: String, default: '' },
        filosofi: [{
            icon: String,
            title: String
        }]
    },
    jenisUlos: [{
        name: String,
        phrase: String,
        description: String
    }],
    tarian: {
        tortor: {
            quote: { type: String, default: 'Tortor dohot gondang sada dapotan' },
            description: { type: String, default: 'Tarian sakral yang mengiringi upacara adat Batak.' },
            link: { type: String, default: 'tortor.html' }
        },
        gondang: {
            quote: { type: String, default: 'Gondang dohot tortor sada dapotan' },
            description: { type: String, default: 'Ensambel musik tradisional dengan taganing, gong, ogung, dan suling.' },
            link: { type: String, default: 'gondang.html' }
        }
    },
    video: {
        subtitle: { type: String, default: 'Media Budaya' },
        title: { type: String, default: 'Video Dokumentasi Budaya Batak' },
        description: { type: String, default: 'Saksikan keindahan tarian tortor, musik gondang, dan upacara adat Batak' },
        url: { type: String, default: '5vN5VcMhRQM' },
        points: [String],
        meta: { type: String, default: 'Durasi: 15 menit | Kualitas: 4K | Produksi: 2024' }
    },
    wisata: [{
        name: String,
        description: String,
        location: String
    }],
    artikel: [{
        day: String,
        month: String,
        title: String,
        excerpt: String
    }],
    event: [{
        day: String,
        month: String,
        name: String,
        location: String
    }],
    quote: {
        text: { type: String, default: 'Horas jala gabe ma di hita saluhutna' },
        author: { type: String, default: 'Harapan dalam adat Batak' },
        translate: { type: String, default: 'Semoga kita semua selamat dan berhasil' }
    },
    kontak: {
        description: { type: String, default: 'Silakan hubungi kami untuk informasi lebih lanjut.' },
        alamat: { type: String, default: 'Jl. Letjen Jamin Ginting No. 1, Medan' },
        phone: { type: String, default: '+62 61 1234 5678' },
        email: { type: String, default: 'info@budayabatak.com' }
    },
    footer: {
        aboutText: { type: String, default: 'Melestarikan dan memperkenalkan kekayaan budaya Batak kepada dunia.' },
        address: { type: String, default: 'Medan, Sumatera Utara' },
        phone: { type: String, default: '+62 61 1234 5678' },
        email: { type: String, default: 'info@budayabatak.com' },
        workingHours: { type: String, default: 'Senin - Jumat: 08:00 - 17:00, Sabtu: 09:00 - 14:00' },
        socialLinks: {
            facebook: { type: String, default: 'https://facebook.com/budayabatak' },
            instagram: { type: String, default: 'https://instagram.com/budayabatak' },
            youtube: { type: String, default: 'https://youtube.com/@budayabatak' },
            tiktok: { type: String, default: 'https://tiktok.com/@budayabatak' }
        }
    },
    seo: {
        title: { type: String, default: 'Budaya Batak | Warisan Leluhur Sumatera Utara' },
        description: { type: String, default: 'Website resmi untuk memperkenalkan kekayaan budaya Batak.' },
        keywords: { type: String, default: 'batak, budaya batak, ulos, tortor, gondang, danau toba' }
    }
}, { timestamps: true });

const Homepage = mongoose.model('Homepage', homepageSchema);

// ========== DEFAULT DATA ==========
const defaultData = {
    hero: {
        badgeText: "ᯂᯬᯒᯘ᯲",
        welcomeText: "Horas! Selamat Datang",
        title: "Jelajahi Kekayaan Budaya Batak",
        description: "Temukan keindahan tradisi, seni, kuliner, dan warisan budaya Batak yang memperkaya Indonesia.",
        button1Text: "Mulai Perjalanan",
        button1Link: "#eksplorasi",
        button2Text: "Tonton Video",
        button2Link: "#video-section",
        imageTag: "Ulos Batak",
        imageUrl: "",
        stats: [
            { number: "300+", label: "Marga Batak" },
            { number: "50+", label: "Jenis Ulos" },
            { number: "100+", label: "Situs Budaya" }
        ]
    },
    eksplorasi: {
        subtitle: "Kearifan Lokal",
        title: "Eksplorasi Budaya Batak",
        description: "Pelajari berbagai aspek budaya Batak melalui kategori berikut:",
        cards: [
            { icon: "fas fa-users", title: "Tradisi & Upacara", description: "Mempelajari berbagai upacara adat Batak.", link: "#", linkText: "Selengkapnya" },
            { icon: "fas fa-paint-brush", title: "Seni & Kerajinan", description: "Menjelajahi keindahan tenun ulos.", link: "#", linkText: "Selengkapnya" },
            { icon: "fas fa-utensils", title: "Kuliner Tradisional", description: "Mengenal berbagai hidangan khas Batak.", link: "#", linkText: "Selengkapnya" },
            { icon: "fas fa-landmark", title: "Warisan Budaya", description: "Mengunjungi situs-situs bersejarah.", link: "#", linkText: "Selengkapnya" }
        ]
    },
    statistik: {
        items: [
            { number: "300+", label: "Marga Batak", description: "Sub-suku dan klan" },
            { number: "50+", label: "Jenis Ulos", description: "Kain tenun tradisional" },
            { number: "100+", label: "Makanan Tradisional", description: "Kuliner khas Batak" },
            { number: "20+", label: "Situs Warisan", description: "Cagar budaya" }
        ]
    },
    ulosFeature: {
        subtitle: "Kain Sakral Batak",
        title: "Filosofi Ulos",
        quote: "Ijuk pangihot ni hodong, ulos pangihot ni holong",
        description: "Ulos bukan sekadar kain tenun biasa. Dalam falsafah hidup orang Batak, Ulos melambangkan kasih sayang, restu, perlindungan, dan ikatan batin.",
        buttonText: "Pelajari Tentang Ulos",
        buttonLink: "ulos.html",
        imageUrl: "",
        filosofi: [
            { icon: "fas fa-heart", title: "Kasih Sayang" },
            { icon: "fas fa-shield-alt", title: "Perlindungan" },
            { icon: "fas fa-crown", title: "Penghormatan" },
            { icon: "fas fa-pray", title: "Restu & Doa" }
        ]
    },
    jenisUlos: [
        { name: "Ulos Ragidup", phrase: "Simbol kehidupan", description: "Untuk upacara pernikahan" },
        { name: "Ulos Sibolang", phrase: "Penghormatan terakhir", description: "Untuk upacara dukacita" },
        { name: "Ulos Ragi Hotang", phrase: "Ikatan persaudaraan", description: "Simbol ikatan kekeluargaan" },
        { name: "Ulos Tumtuman", phrase: "Tanda terima kasih", description: "Diberikan kepada orang yang berjasa" }
    ],
    tarian: {
        tortor: {
            quote: "Tortor dohot gondang sada dapotan",
            description: "Tarian sakral yang mengiringi upacara adat Batak.",
            link: "tortor.html"
        },
        gondang: {
            quote: "Gondang dohot tortor sada dapotan",
            description: "Ensambel musik tradisional dengan taganing, gong, ogung, dan suling.",
            link: "gondang.html"
        }
    },
    video: {
        subtitle: "Media Budaya",
        title: "Video Dokumentasi Budaya Batak",
        description: "Saksikan keindahan tarian tortor, musik gondang.",
        url: "5vN5VcMhRQM",
        points: ["Tari Tortor Sakral", "Musik Gondang Sabangunan", "Upacara Adat Pernikahan"],
        meta: "Durasi: 15 menit | Kualitas: 4K"
    },
    wisata: [
        { name: "Danau Toba", description: "Danau vulkanik terbesar", location: "Sumatera Utara" },
        { name: "Rumah Bolon", description: "Rumah adat tradisional", location: "Samosir" }
    ],
    artikel: [
        { day: "15", month: "Mar", title: "Sejarah Batak", excerpt: "Mengenal asal-usul marga Batak" },
        { day: "20", month: "Mar", title: "Makna Ulos", excerpt: "Filosofi di balik kain tenun" }
    ],
    event: [
        { day: "15-20", month: "Juni", name: "Festival Danau Toba", location: "Parapat" }
    ],
    quote: {
        text: "Horas jala gabe ma di hita saluhutna",
        author: "Harapan adat Batak",
        translate: "Semoga kita semua selamat dan berhasil"
    },
    kontak: {
        description: "Silakan hubungi kami",
        alamat: "Medan, Sumatera Utara",
        phone: "+62 61 1234 5678",
        email: "info@budayabatak.com"
    },
    footer: {
        aboutText: "Melestarikan budaya Batak",
        address: "Medan, Sumatera Utara",
        phone: "+62 61 1234 5678",
        email: "info@budayabatak.com",
        workingHours: "Senin - Jumat: 08:00 - 17:00",
        socialLinks: {
            facebook: "#",
            instagram: "#",
            youtube: "#",
            tiktok: "#"
        }
    },
    seo: {
        title: "Budaya Batak | Warisan Leluhur Sumatera Utara",
        description: "Website resmi untuk memperkenalkan kekayaan budaya Batak",
        keywords: "batak, budaya batak, ulos, tortor, gondang"
    }
};

// ========== UPLOAD ENDPOINTS ==========
app.post('/api/upload/hero', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Tidak ada file yang diupload' });
        }
        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({ success: true, filePath: fileUrl, filename: req.file.filename });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/upload/ulos', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Tidak ada file yang diupload' });
        }
        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({ success: true, filePath: fileUrl, filename: req.file.filename });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Tidak ada file yang diupload' });
        }
        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({ success: true, filePath: fileUrl, filename: req.file.filename });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ========== API ROUTES ==========
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 Server Budaya Batak dengan MongoDB berjalan!',
        database: 'MongoDB',
        status: 'Connected',
        endpoints: {
            homepage: '/api/homepage',
            admin: '/admin/homepage.html',
            frontend: '/index.html',
            test: '/api/test'
        }
    });
});

app.get('/api/test', (req, res) => {
    res.json({ success: true, message: 'API is working!', timestamp: new Date().toISOString() });
});

app.get('/api/homepage', async (req, res) => {
    try {
        let data = await Homepage.findOne();
        if (!data) {
            data = await Homepage.create(defaultData);
        }
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.put('/api/homepage', async (req, res) => {
    try {
        let data = await Homepage.findOne();
        if (!data) {
            data = await Homepage.create(req.body);
        } else {
            Object.assign(data, req.body);
            data.lastUpdated = new Date();
            await data.save();
        }
        res.json({ success: true, data, message: 'Data berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/homepage', async (req, res) => {
    try {
        const data = await Homepage.create(req.body);
        res.json({ success: true, data, message: 'Data berhasil dibuat' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ========== START SERVER ==========
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 SERVER BUDATA BATAK MONGODB');
    console.log('='.repeat(60));
    console.log(`📍 Server: http://localhost:${PORT}`);
    console.log(`📍 Admin Panel: http://localhost:${PORT}/admin/homepage.html`);
    console.log(`📍 Frontend: http://localhost:${PORT}/index.html`);
    console.log(`📍 Uploads: http://localhost:${PORT}/uploads/`);
    console.log(`🍃 Database: MongoDB (budaya_batak)`);
    console.log('='.repeat(60));
    console.log('\n✅ Server siap menerima koneksi!\n');
});