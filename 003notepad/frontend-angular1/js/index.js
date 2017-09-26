/**
 * Created by 丸子 on 2017/9/26.
 */
//    angularJS 模块（Module） 定义了 AngularJS 应用。
var app = angular.module('myApp', []);
//AngularJS 控制器
app.controller('myCtrl', function ($scope) {
  // $scope.firstName = "Jone";
  // $scope.lastName = "Doe";
  $scope.addForm = {
    title: "title",
    content: "content"
  };
  $scope.formSave = function () {
    var title = $scope.addForm.title;
    var content = $scope.addForm.content;
    if (title == "" || content == "") {
      alert("请输入内容！");
      return;
    }
    $.post('http://localhost:3000/note', {
      title: title,
      content: content
    }, function (data, status) {
      console.log(data, status)
      if (data.status == 0) {
        $scope.addForm = {
          title: '',
          content: ''
        }
        $scope.$apply();
      } else {

        alert('创建失败')
      }
    })
  }
})