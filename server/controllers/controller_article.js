const Article = require('../models/article')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = {

  GetArticles (req, res) {
    Article.find({}).populate('UserId').exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data)
      }
    })
  },

  PostArticle (req, res) {
    const decoded = jwt.decode(req.body.token).id
    let newDate = new Date
    const date = String(newDate).slice(0, 15)
    const time = String(newDate).slice(16, 24)
    const now = `${date}, ${time}`

    const newArticle = {
      title: req.body.article.title,
      article: req.body.article.article,
      UserId: decoded,
      date: now
    }

    Article.create((newArticle), (err, response) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).json('success add article')
      }
    })
  },

  Edit (req, res) {
    Article.find({ _id: req.body.id }, (err, data) => {
      data[0].title = req.body.title
      data[0].article = req.body.article
      data[0].save()
      res.status(201).json(data)
    })
  },

  Delete (req, res) {
    Article.findOneAndRemove(req.params.id, (err, response) => {
      res.status(201).json(response)
    })
  }

};
