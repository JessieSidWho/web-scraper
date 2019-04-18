var express = require('express');
var router = express.Router();
var articleController = require('../controllers/articleController')

/* GET users listing. */
router.get('/', articleController.all);
router.get('/create', articleController.scrapeArticles);
router.get('/saveArticle/:id', articleController.saveArticle)

module.exports = router;