/**
 * Created by Administrator on 2017/7/23.
 */
var express = require('express');
var router = express.Router();
var Note = require('../db').Note;

// 新增一条笔记
router.post('/', function (req, res) {
  var title = req.param('title');
  var content = req.param('content');

  var note = new Note({title: title, content: content, createTime: Date.now()});
  note.save();
  console.log(title, content)
  res.json({
    status: 0,
    msg: 'save success'
  });
});
// 获取所有笔记
router.get('/', function (req, res) {
  var key = req.param('key');
  var query = {};
  if (key) {
    query = {
      $or: [{
        title: new RegExp(key, "i")
      }, {
        content: new RegExp(key, "i")
      }]
    };
  }
  Note.find(query, function (req, notes) {
    console.log(notes);
    res.json({
      status: 0,
      msg: "获取成功",
      data: notes
    })
  })
});
// 删除指定id笔记
router.delete('/:id', function (req, res, next) {
  var id = req.param('id');
  Note.find({_id: id}).remove().exec();
  res.json({
    status: 0,
    msg: "删除成功"
  })
});
module.exports = router;

// 修改笔记
router.put('/:id', function (req, res, next) {
  var id = req.param('id');
  Note.findOne({_id: id}, function (err, note) {
    if (note != null) {
      var title = req.param('title');
      var content = req.param('content');
      note.title = title;
      note.content = content;
      note.save();
      res.json({
        status: 0,
        msg: "修改成功"
      })
    } else {
      res.json({
        status: -1,
        msg: "数据不存在"
      })
    }
  })
});

router.get('/uncle', function (req, res) {
  var timeBefore = req.param('timeBefore');
  Note.find({
    createTime: {$gt: timeBefore}
  }, (function (req, notes) {
    console.log(notes);
    res.json({
      status: 0,
      msg: "获取成功",
      data: notes
    })
  }))
});
