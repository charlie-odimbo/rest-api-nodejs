/**
 * @file bear.js
 * Example of a model object
 * @author Charlie Fontana <cfontana0@gmail.com>
 * @version 0.1
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
  name 		: { type: String },
  year 		: { type: Number },
  country 	: { type: String },
  poster 	: { type: String },
  seasons	: { type: Number },
  genre		: { type: String, enum: ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']},
  summary 	: { type: String }
});

module.exports = mongoose.model('Bear', BearSchema);