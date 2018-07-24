const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: { type:String },
  article: { type:String },
  UserId: { type:Schema.Types.ObjectId, ref:'User' },
  date: { type:String },
  comment: []
},{
  timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article;
