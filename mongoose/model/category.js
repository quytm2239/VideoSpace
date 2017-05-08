// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

// create a schema
var category = new Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
});

// the schema is useless so far
// we need to create a model using it
var Category = mongoose.model('Category', category, 'Category');

// make this available to our users in our Node applications
module.exports = Category;
