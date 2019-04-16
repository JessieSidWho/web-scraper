const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/new_db', {useNewUrlParser: true});

const db = mongoose.connection;

const Schema = mongoose.Schema;

const nytSchema = new Schema({
    title: String,
    summary: String,
    href: String,
    comments: [String]
})

db.on('error', (error) => {
    console.log(error);
})

db.once('open', function(){
    console.log("connected");
})

