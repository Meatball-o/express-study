/**
 * Created by Administrator on 2017/7/23.
 */
var express = require('express');
var router = express.Router();
var Note = require('../db').Note;

// 新增一条笔记
router.post('/', function (req, res, next) {
  var title = req.param('title');
  var content = req.param('content');

  var note=new Note({title:title,content:content,createTime:Date.now()});
  note.save();
  console.log(title, content)
  res.json({
    status:0,
    msg:'保存成功'
  });
});

// 获取所有笔记
router.get('/', function (req, res, next) {
  Note.find(function (req,notes) {
    console.log(notes);
    res.json({
      status:0,
      msg:"获取成功",
      data:notes
    })
  })
});

router.delete('/:id', function (req, res, next) {
  var id = req.param('id');
  Note.find({_id:id}).remove().exec();
  res.json({
    status:0,
    msg:"删除成功"
  })
});


module.exports = router;
