var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req/*请求对象*/, res/*返回*/, next) {
  res.render('index',
    {
      title: 'aaa',
      uncle: '丸宝宝的大叔叔',
      ball: '大叔叔'
    }
  );
})
module.exports = router;
