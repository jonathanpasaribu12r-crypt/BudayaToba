const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET semua messages
router.get('/', async (req, res) => {
    try {
        const { unread } = req.query;
        
        let query = {};
        if (unread === 'true') {
            query.isRead = false;
        }
        
        const messages = await Message.find(query)
            .sort({ createdAt: -1 });
            
        const total = await Message.countDocuments(query);
            
        res.json({ messages, total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single message
router.get('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Pesan tidak ditemukan' });
        }
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST message baru (dari frontend)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        
        const newMessage = new Message({
            name,
            email,
            phone,
            subject,
            message
        });
        
        await newMessage.save();
        
        res.status(201).json({ 
            message: 'Pesan berhasil dikirim',
            data: newMessage 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Tandai sudah dibaca
router.put('/:id/read', async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        res.json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Balas pesan
router.put('/:id/reply', async (req, res) => {
    try {
        const { replyMessage } = req.body;
        
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { 
                replied: true, 
                replyMessage,
                isRead: true 
            },
            { new: true }
        );
        
        res.json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE message
router.delete('/:id', async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Pesan berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;