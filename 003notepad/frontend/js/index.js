/**
 * Created by 丸子 on 2017-09-14.
 */
$(function () {
  $("#save").click(function () {
    var title = $("#note_title").val();
    var content = $("#note_con ").val();
    if(title==""||content==""){
      alert("请输入内容！");
      return;
    }
    $.post('http://localhost:3000/note', {
      title: title,
      content: content
    }, function (data, status) {
      console.log(data, status)
      if (data.status == 0) {
        $('#formAdd')[0].reset();
        fetchList();
      } else {

        alert('创建失败')
      }
    })
  })

  var THS = ['序号', '日期', '标题', '内容', 'id', '操作'];

  function getDeleteDom(item, index) {
    return '<button class="btn  btn-danger btn-xs"  onclick="deleteItem(\'' + item._id + '\')">删除</button>';
  }

  function getEditDom(item, index) {
    return '<button class="btn btn-success btn-xs" onclick="showEditDialog(\'' + item._id + '\')">编辑</button>';
  }

  var KEYS = [
    function (item, index) {
      return index + 1;
    },
    'createTime', 'title', 'content', '_id',
    function (item, index) {
      return [
        getDeleteDom(item, index),
        getEditDom(item, index)
      ].join('&nbsp;');
    }];

  // 删除
  window.deleteItem = function deleteItem(id) {
    // console.log('deleteItem:', id);
    $.ajax({
      url: 'http://localhost:3000/note/' + id,
      type: 'DELETE',
      success: function (data, status) {
        console.log(data, status);
        fetchList();
      }
    });
  }

  // 编辑
  window.showEditDialog = function showEditDialog(id) {
    //TODO
    var item = findItemById(id);
    renderEditDialogContent(item);
    $("#editDialog").modal();
    console.log('showEditDialog:', id);
  }

  var EDIT_KEYS = ['title', 'content', '_id'];

  function renderEditDialogContent(item) {
    var editForm = $('#editDialog').find('form')[0];
    EDIT_KEYS.forEach(function (key) {
      var input = editForm[key];
      input.value = item[key]
    })
  }

// 搜索清除
  $("#searchClear").click(function () {
    $("#searchKey").val('');
    fetchList();
  })
  function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
      indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
  }

  $('#editSave').click(function () {
    var editData = getFormData($('#editDialog').find('form'))
    console.log('editData:', editData);
    // 保存修改
    $.ajax({
      url: 'http://localhost:3000/note/' + editData._id,
      type: 'PUT',
      data: editData,
      success: function (data, status) {
        $("#editDialog").modal('hide');
        console.log(data, status);
        fetchList();
      }
    });

  })
  $("#searchBtn").click(function () {
    fetchList();
  })
  function findItemById(id) {
    for (var i = 0; i < NOTES.length; i++) {
      var item = NOTES[i];
      if (id == item._id) {
        return item;
      }
    }
    return null;
  }

  function renderTable(list) {
    var $table = $('<table class="table table-striped">');

    var thTds = THS.map(function (item) {
      return '<th>' + item + '</th>';
    }).join('');

    $('<thead>').append($('<tr>').append(thTds)).appendTo($table);

    var $tbody = $('<tbody>').appendTo($table);
    (list || []).forEach(function (item, index) {
      var $tr = $('<tr>');
      var trTds = KEYS.map(function (key) {
        var tdContent;
        if ($.isFunction(key)) {
          tdContent = key(item, index);
        } else {
          tdContent = item[key];
        }
        return '<td>' + tdContent + '</td>';
      }).join('')
      $tbody.append($tr.append(trTds));
    });
    $('#table').empty().append($table);
  }

  var NOTES = null;

  function fetchList() {
    $.get('http://localhost:3000/note', {key: $("#searchKey").val()}, function (data, status) {
      console.log(data, status);
      var list = NOTES = data.data;
      renderTable((list || []).reverse());
    });
  }

  fetchList();
})
