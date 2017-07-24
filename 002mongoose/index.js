var Kitten = require('./db').Kitten


function save() {
  var fluffy = new Kitten({name: 'fluffy'});
  fluffy.speak(); // "Meow name is fluffy"

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
  });
}
// save();


function find() {
  Kitten.find({name: /^fluff/}, function (err, kittens) {
    console.log(kittens);
  });
}
// find();

function removeAll() {
  Kitten.find().remove().exec();
}
// removeAll();

// 删除 name为fluffy 的Kitten
function remove() {
  Kitten.find({name: "fluffy"}).remove().exec();
}
// remove();

// 修改 name为fluffy 为
function modify() {
 Kitten.find({name:"曹月悦"},function (err,kittens) {
   var cyy = kittens[0]
   if(cyy){
     cyy.name="王豪";
     cyy.save();
   }
 })

}
modify();
