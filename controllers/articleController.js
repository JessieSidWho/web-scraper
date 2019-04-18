const axios = require("axios")
const cheerio = require('cheerio');
var Article = require('../models/article');
var SavedArticle = require('../models/savedArticles');

exports.all = async function all(req, res) {
  let articles;
  try {
    articles = await Article.find();
    res.render('index', { articles: articles });
    console.log(articles.length);
  } catch (e) {
    res.send(e);
  }
}

exports.addArticle = async function addArticle(req, res) {
  var article = new Article({ title: 'The Title', href: 'http://nyt.com' })
  try {
    await article.save();
    res.send('saved')
  } catch (err) {
    res.send(err)
  }
}

exports.scrapeArticles = async function scrapeArticles(req, res) {
  var response = await axios.get('https://www.nytimes.com/section/us')

  var $ = cheerio.load(response.data)

  try {
    for (let i = 1; i < 5; i++) {
      let href = $(`#stream-panel > div.css-13mho3u > ol > li:nth-child(${i}) > div > div.css-4jyr1y > a`).attr('href');
      let title = $(`#stream-panel > div.css-13mho3u > ol > li:nth-child(${i}) > div > div.css-4jyr1y > a > h2`).text();
      let summary = $(`#stream-panel > div.css-13mho3u > ol > li:nth-child(${i}) p`).text();
      var article = new Article({
        title: title,
        summary: summary,
        href: href
      })
      await article.save()
    }
    res.send('got it')
  } catch (err) {
    res.send(err)
  }
}

exports.saveArticle = async (req, res) => {
  let article
  try {
    article = await Article.findOne({ _id: req.params.id })
    const savedArticle = new SavedArticle({
      title: article.title,
      summary: article.summary,
      href: article.href
    })
    await savedArticle.save();
    res.json(savedArticle);
  } catch (e) {
    res.send(e);
  }
}