// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

// create a schema
var video = new Schema({
  name: String,
  desc: String,
  url: String,
  thumb: String,
  category: String,
  created_at: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
var Video = mongoose.model('Video', video, 'Video');

// make this available to our users in our Node applications
module.exports = Video;
