const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { authenticateAdmin } = require('../middleware/auth');

// GET /api/stats - Admin dashboard overview statistics
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const [projectCount, messageCount, unreadMessageCount, skillCount] = await Promise.all([
      prisma.project.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.skill.count()
    ]);

    const categories = await prisma.project.groupBy({
      by: ['category'],
      _count: { id: true }
    });

    res.json({
      projects: projectCount,
      messages: messageCount,
      unreadMessages: unreadMessageCount,
      skills: skillCount,
      categoriesDistribution: categories.map(c => ({
        category: c.category,
        count: c._count.id
      }))
    });
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    res.status(500).json({ error: 'Failed to retrieve statistics' });
  }
});

module.exports = router;

