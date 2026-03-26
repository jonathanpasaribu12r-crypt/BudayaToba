const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Data user sementara
const users = [
    {
        id: 1,
        name: 'Admin Utama',
        email: 'admin@budayabatak.com',
        password: 'batak123',
        role: 'admin'
    }
];

// ============================================
// LOGIN
// ============================================
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari user
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Email atau password salah' 
            });
        }

        // Buat token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            'batak_culture_secret_key_2024',
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan server' 
        });
    }
});

// ============================================
// TEST ROUTE
// ============================================
router.get('/test', (req, res) => {
    res.json({ 
        success: true,
        message: 'Auth route is working',
        timestamp: new Date()
    });
});

module.exports = router;