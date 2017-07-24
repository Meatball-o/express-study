/**
 * Created by Administrator on 2017/7/23.
 */
/**
 * Created by Heiliuer on 2017/7/22 0022.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/note');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

var noteSchema = mongoose.Schema({
  title: String,
  content:String,
  createTime:Number
});



var Note = mongoose.model('Note', noteSchema);
module.exports = {Note: Note}