const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const { generateArticle, generateSimpleArticle } = require('../services/aiClient');

// GET /articles → lista todos
router.get('/', async (req, res) => {
  const articles = await Article.findAll();
  res.json(articles);
});

// GET /articles/:id → busca 1
router.get('/:id', async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  if (!article) return res.status(404).send('Not found');
  res.json(article);
});

// POST /articles → cria 1
router.post('/', async (req, res) => {
  const { title, body } = req.body;
  const created = await Article.create({ title, body });
  res.status(201).json(created);
});

// POST /articles/generate - Gera novo artigo com AI
router.post('/generate', async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic || topic.trim().length === 0) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    console.log(`🤖 Generating article about: ${topic}`);

    // Tenta gerar com AI, se falhar usa fallback
    let articleData;
    try {
      articleData = await generateArticle(topic);
      console.log('✅ Article generated with AI');
    } catch (aiError) {
      console.warn('⚠️  AI generation failed, using simple fallback');
      articleData = generateSimpleArticle(topic);
    }

    // Salva no banco de dados
    const article = await Article.create(articleData);

    res.status(201).json(article);
  } catch (error) {
    console.error('Error generating article:', error);
    res.status(500).json({ error: 'Failed to generate article' });
  }
});

// DELETE /articles/:id - Apaga um artigo
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    await article.destroy();
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

module.exports = router;
