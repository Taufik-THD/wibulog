const express = require('express');
const router = express.Router();
const { GetArticles, PostArticle, Edit, Delete } = require('../controllers/controller_article')

router.get('/', GetArticles)

router.post('/', PostArticle)

router.post('/edit', Edit)

router.delete('/:id', Delete)

module.exports = router;
