var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    summary: {
      type: String
    },
    href: {
      type: String,
      required: true,
      dropDups: true
    }
  }
)

var SavedArticle = mongoose.model("SavedArticle", ArticleSchema);
module.exports = SavedArticle;