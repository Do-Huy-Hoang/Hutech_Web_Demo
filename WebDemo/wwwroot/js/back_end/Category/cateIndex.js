﻿var size = 6;
var totalPage = 1;
var list = null;
var submit = null;
var p = 1;
var cateName = null;
var icon = '<i class="fas fa-exclamation-circle" style="padding-right:10px;"></i>';
var pName = document.getElementById('pName');
var checkName = false;
$(document).ready(function () {
    $("#pagination").hide();
    $("#Previous").hide();
    setTimeout(function () {
        $("#Spinner").hide();
        $("#pagination").show();
        getDataCategories(1, cateName);
    }, 300);
});

function search() {
    cateName = $("input[name='cateName']").val();
    if (cateName == null || cateName == "") {
        cateName = null;
        $("#Spinner").hide();
        $("#pagination").show();
        getDataCategories(1, cateName);
    } else {
        getDataCategories(p, cateName);
    }
}

function getDataCategories(p, cateName) {
    $.ajax({
        type: "GET",
        url: "/AdminCategories/get_data_categories",
        data: { 'page': p, 'size': size, 'cateName': cateName },
        async: false,
        success: function (res) {
            if (res.success) {
                let data = res.data;
                if (data.data != null && data.data != undefined) {
                    let stt = (p - 1) * size + 1;
                    let dataRes = [];
                    for (var i = 0; i < data.data.length; i++) {
                        let item = data.data[i];
                        item.STT = stt;
                        dataRes.push(item);
                        stt++;
                    }
                    list = dataRes;
                    if (data.totalPage <= 1) {
                        $("#pagination").hide();
                    }
                    $("#tbodyResult").html("");
                    $("#courseTemplate").tmpl(list).appendTo("#tbodyResult");
                }
                totalPage = data.totalPage;
                $("#curPage").text(p);
            }
            else {
                alert(res.message);
            }
        },
        failure: function (res) {
            alert(res.message);
        },
        error: function (res) {

        }
    });
}


function per() {
    var curPage = parseInt($("#curPage").text());
    p = curPage - 1;
    getDataCategories(p, cateName);

    if (p - 1 <= 0) {
        $("#Previous").hide();
        $("#Next").show();
    } else {
        $("#Next").show();
        $("#Previous").show();
    }
}

function next() {
    var curPage = parseInt($("#curPage").text());
    p = curPage + 1;
    getDataCategories(p, cateName);
    if (p + 1 > totalPage) {
        $("#Previous").show();
        $("#Next").hide();
    }
    else {
        $("#Previous").show();
        $("#Next").show();
    }
}

function showInfo(id) {
    $("#pName").hide();
    if (list != null && id != null && id > 0) {
        let item = $.grep(list, function (obj) {
            return obj.cateId == id
        })[0];
        $("#txtName").val(item.cateName);
        $("#txtId").val(item.cateId);
        $("#txtCreatAt").val(item.createAt);
    }
}

function save() {
    if ($("#txtId").val() != "" && $("#txtId").val() != null && $("#txtId").val() != undefined) {
        if ($("#txtName").val() == "" && $("#txtName").val() == null && $("#txtName").val() == undefined) {
            pName.innerHTML = icon + 'Cate name can not blank!!!';
            $("#pName").show();
        } else {
            $("#pName").hide();
            var item = {
                CateId: $("#txtId").val(),
                CateName: $("#txtName").val(),
                CreateAt: $("#txtCreatAt").val()
            }; 
            update(item);
        }
           
    }
}

function update(item) {
    $.ajax({
        type: "POST",
        url: "/AdminCategories/update_category",
        data:
            { 'category': item },
        async: false,
        success: function (res) {
            if (res.success) {
                toastr.success("", res.message);
                setTimeout(function () {
                    window.location.href = "/AdminCategories";
                }, 1000)
            } else {
                if (res.check) {
                    pName.innerHTML = icon + res.message;
                    $("#pName").show();
                }
                else {
                    toastr.error("", res.message);
                }
            }
        },
        failure: function (res) {
            alert(res.message);
        },
        error: function (res) {

        }
    });
}

function deleteAt(id) {
    $("#btnDelete").click(function () {
        $.ajax({
            type: "DELETE",
            url: "/AdminCategories/delete_category",
            data: { 'cateId': id },
            async: false,
            success: function (res) {
                if (res.success) {
                    toastr.success("", res.message);
                    getDataCategories(p);
                }
                if (res.Failed) {
                    toastr.error("", res.message);
                    getDataCategories(p);
                }
                console.log(res.success)
            },
            failure: function (res) {
                alert(res.message);
            },
            error: function (res) {

            }
        });
    })
}
