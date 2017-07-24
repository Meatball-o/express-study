/**
 * Created by Administrator on 2017/7/23.
 */
/**
 * Created by Heiliuer on 2017/7/22 0022.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

var kittySchema = mongoose.Schema({
  name: String
});


kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);
module.exports={Kitten:Kitten}