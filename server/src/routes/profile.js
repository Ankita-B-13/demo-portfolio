const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { authenticateAdmin } = require('../middleware/auth');

// GET /api/profile - Fetch developer profile
router.get('/', async (req, res) => {
  try {
    let profile = await prisma.profile.findFirst();
    if (!profile) {
      // Default fallback profile if not yet seeded
      profile = {
        name: "Alex Rivera",
        title: "Senior Full-Stack Engineer & System Architect",
        tagline: "Architecting resilient, performant full-stack systems and intuitive web experiences.",
        bio: "I am a passionate software engineer with experience building modern web applications, scalable backends, and elegant user interfaces.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        email: "alex.rivera.dev@example.com",
        location: "San Francisco, CA / Remote",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        resumeUrl: "#",
        yearsExperience: 4,
        projectsCompleted: 24,
        clientsSatisfied: 18,
        availableForHire: true
      };
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

// PUT /api/profile - Update profile (Admin only)
router.put('/', authenticateAdmin, async (req, res) => {
  try {
    const existing = await prisma.profile.findFirst();
    let updated;

    if (existing) {
      updated = await prisma.profile.update({
        where: { id: existing.id },
        data: req.body
      });
    } else {
      updated = await prisma.profile.create({
        data: req.body
      });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// GET /api/profile/skills - Fetch all skills grouped by category
router.get('/skills', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [
        { category: 'asc' },
        { proficiency: 'desc' }
      ]
    });

    // Group by category
    const grouped = skills.reduce((acc, skill) => {
      acc[skill.category] = acc[skill.category] || [];
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({ skills, grouped });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to retrieve skills' });
  }
});

// POST /api/profile/skills - Add skill (Admin only)
router.post('/skills', authenticateAdmin, async (req, res) => {
  try {
    const { name, category, proficiency, icon } = req.body;
    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }

    const newSkill = await prisma.skill.create({
      data: {
        name,
        category,
        proficiency: proficiency !== undefined ? parseInt(proficiency, 10) : 80,
        icon: icon || 'Code'
      }
    });

    res.status(201).json(newSkill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

// DELETE /api/profile/skills/:id - Delete skill (Admin only)
router.delete('/skills/:id', authenticateAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid skill ID' });
    }

    await prisma.skill.delete({ where: { id } });
    res.json({ message: 'Skill deleted successfully', id });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

module.exports = router;
