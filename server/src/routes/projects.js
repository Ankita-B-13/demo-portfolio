const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { authenticateAdmin } = require('../middleware/auth');

// GET /api/projects - List projects with optional filter and search
router.get('/', async (req, res) => {
  try {
    const { category, search, featured } = req.query;

    const where = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } }
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
});

// GET /api/projects/categories - List unique categories
router.get('/categories', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      select: { category: true },
      distinct: ['category']
    });
    const categories = ['All', ...projects.map(p => p.category)];
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/projects/:id - Get project details
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error retrieving project:', error);
    res.status(500).json({ error: 'Failed to retrieve project details' });
  }
});

// POST /api/projects - Create project (Admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const {
      title,
      description,
      fullDescription,
      category,
      image,
      tags,
      liveUrl,
      githubUrl,
      featured,
      challenges,
      features,
      order
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        fullDescription: fullDescription || description,
        category: category || 'Full Stack',
        image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
        tags: Array.isArray(tags) ? tags.join(', ') : (tags || 'Web Development'),
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        featured: Boolean(featured),
        challenges: challenges || null,
        features: features || null,
        order: order !== undefined ? parseInt(order, 10) : 0,
      }
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id - Update project (Admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const {
      title,
      description,
      fullDescription,
      category,
      image,
      tags,
      liveUrl,
      githubUrl,
      featured,
      challenges,
      features,
      order
    } = req.body;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        fullDescription,
        category,
        image,
        tags: Array.isArray(tags) ? tags.join(', ') : tags,
        liveUrl,
        githubUrl,
        featured: featured !== undefined ? Boolean(featured) : undefined,
        challenges,
        features,
        order: order !== undefined ? parseInt(order, 10) : undefined,
      }
    });

    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id - Delete project (Admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    await prisma.project.delete({
      where: { id }
    });

    res.json({ message: 'Project successfully deleted', id });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;

