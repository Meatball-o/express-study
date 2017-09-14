/**
 * Created by Administrator on 2017-09-14.
 */
$(function () {

  $(".add").click(function () {
    var noAdd = $(".no_add");
    var noText = ('<textarea class="no_text col-xs-11">请输入文本信息!</textarea>')
    noAdd.append(noText);
    $(".remove").click(function () {
      noText.remove();
    })

  })

  $(".save").click(function () {

    $.post('http://localhost:3000/note', {
      title: '开学了',
      content: '今天开学要好好学习'
    }, function (status, data, message) {
      console.log(status, data, message)
    })

  })

})
