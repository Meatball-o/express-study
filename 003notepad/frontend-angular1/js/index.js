/**
 * Created by 丸子 on 2017/9/26.
 */
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
  $scope.searchKey = "";
  $scope.editingItem = null;
  $scope.loading=false;
  $scope.addForm = {
    title: "title",
    content: "content"
  };
  // 保存添加内容
  $scope.formSave = function () {
    var title = $scope.addForm.title;
    var content = $scope.addForm.content;
    if (title == "" || content == "") {
      alert("请输入内容！");
      return;
    }
    $scope.loading=true;
    $.post('http://localhost:3000/note', {
      title: title,
      content: content
    },function (data, status) {
      console.log(data, status)
      if (data.status == 0) {
        $scope.addForm = {
          title: '',
          content: ''
        }
        $scope.fetchList();
      } else {
        alert('创建失败')
      }
      $scope.loading=false;
    })
  }
  $scope.noteList = [];
  $scope.fetchList = function () {
    $scope.loading=true;
    $.get('http://localhost:3000/note', {key: $scope.searchKey}, function (data, status) {
      console.log(data, status);
      $scope.noteList = (data.data || []).reverse();
      $scope.loading=false;
      $scope.$apply();
    });
  };

  $scope.findItemById = function (id) {
    for (var i = 0; i < $scope.noteList.length; i++) {
      var item = $scope.noteList[i];
      if (id == item._id) {
        return item;
      }
    }
    return null;
  };

  function copyObj(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  // 编辑
  $scope.noteEdit = function (id) {
    console.log("noteEdit:", id);
    $scope.editingItem = copyObj($scope.findItemById(id));
    // $scope.apply();
    $("#editDialog").modal();
  }

  // 编辑保存
  $scope.editSave=function () {
    // 保存修改
    $scope.loading=true;

    $.ajax({
      url: 'http://localhost:3000/note/' + $scope.editingItem._id,
      type: 'PUT',
      data: {
        title:$scope.editingItem.title,
        content:$scope.editingItem.content
      },
      success: function (data, status) {
        $("#editDialog").modal('hide');
        console.log(data, status);
        $scope.fetchList();
        $scope.loading=false;

      }
  });
  }
  // 删除
  $scope.noteDelete = function (id) {
    // console.log("noteDelete:",id);
    $.ajax({
      url: 'http://localhost:3000/note/' + id,
      type: 'DELETE',
      success: function (data, status) {
        console.log(data, status);
        $scope.fetchList();
      }
    });
  }
  $scope.formSearch=function () {
    $scope.fetchList();
  }
  $scope.clearSearch=function () {
    $scope.searchKey="";
    $scope.fetchList();
  }
  $scope.fetchList();
})