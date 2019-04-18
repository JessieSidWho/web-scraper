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

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;