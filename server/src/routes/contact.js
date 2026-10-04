const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { authenticateAdmin } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Rate limiter for contact submissions: 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages sent from this IP. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Email validation helper
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/contact - Submit contact inquiry
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Valid email address is required' });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters long' });
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject ? subject.trim() : 'Portfolio Inquiry',
        message: message.trim(),
        read: false,
      }
    });

    res.status(201).json({
      message: 'Your message has been received! Thank you for reaching out.',
      id: newMessage.id
    });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// GET /api/contact - List all messages (Admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// PATCH /api/contact/:id/read - Toggle read status (Admin only)
router.patch('/:id/read', authenticateAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    const message = await prisma.contactMessage.findUnique({ where: { id } });
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { read: !message.read }
    });

    res.json(updated);
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ error: 'Failed to update message status' });
  }
});

// DELETE /api/contact/:id - Delete message (Admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    await prisma.contactMessage.delete({ where: { id } });
    res.json({ message: 'Message deleted successfully', id });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;

