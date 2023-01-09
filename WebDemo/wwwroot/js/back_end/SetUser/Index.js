var size = 6;
var totalPage = 1;
var list = null;
var submit = null;
var p = 1;
var userName = null;
var selectIsAdmin = document.getElementById("selectIsAdmin");
$(document).ready(function () {
    $("#pagination").hide();
    $("#Previous").hide();
    setTimeout(function () {
        $("#Spinner").hide();
        $("#pagination").show();
        getDataUser(1, userName);
    }, 300);
});

function search() {
    userName = $("input[name='userName']").val();
    if (userName == null || userName == "") {
        userName = null;
        $("#Spinner").hide();
        $("#pagination").show();
        getDataUser(1, userName);
    } else {
        getDataUser(p, userName);
    }
}

function getDataUser(p, userName) {
    $.ajax({
        type: "GET",
        url: "/SetUser/get_data_user",
        data: { 'page': p, 'size': size, 'userName': userName },
        async: false,
        success: function (res) {
            if (res.success) {
                let data = res.data;
                if (data.data != null && data.data != undefined) {
                    let stt = (p - 1) * size + 1;
                    let dataRes = [];
                    for (var i = 0; i < data.data.length; i++) {
                        let itm = data.data[i];
                        itm.STT = stt;
                        dataRes.push(itm);
                        stt++;
                    }
                    list = dataRes;
                    if (data.totalPage == 1) {
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
    getDataCategories(p, userName);

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
    getDataCategories(p, userName);
    if (p + 1 > totalPage) {
        $("#Previous").show();
        $("#Next").hide();
    }
    else {
        $("#Previous").show();
        $("#Next").show();
    }
}

function showInfoUser(id) {
    if (list != null && id != null && id >= 0) {
        let itm = $.grep(list, function (obj) {
            return obj.userId == id;
        })[0];

        $("#txtuserID").val(itm.userId);
        $("#txtuserName").val(itm.userName);
        $("#txtuserEmail").val(itm.userEmail)
        $("#txtuserPhone").val(itm.userPhoneNumber);
        $("#txtuserAddress").val(itm.userAddress);
        selectIsAdmin.value = itm.isAdmin;
    }
}

function save() {
    if ($("#txtuserID").val() != "" && $("#txtuserID").val() != null && $("#txtuserID").val() != undefined) {
        var item = {
            userId: $("#txtuserID").val(),
            userName: $("#txtuserName").val(),
            userEmail: $("#txtuserEmail").val(),
            userPhoneNumber: $("#txtuserPhone").val(),
            userAddress: $("#txtuserAddress").val(),
            isAdmin: selectIsAdmin.value,
        };
        $.ajax({
            type: "POST",
            url: "/SetUser/update_user",
            data:
                { 'user': item },
            async: false,
            success: function (res) {
                if (res.success) {
                    toastr.success("", res.message);
                    getDataCategories(p);
                }
                else {
                    toastr.error("", res.message);
                    getDataCategories(p);
                }
            },
            failure: function (res) {
                alert(res.message);
            },
            error: function (res) {

            }
        });
        setTimeout(function () {
            $("#Spinner").hide();
            $("#pagination").show();
            getDataUser(1, userName);
        }, 300);
    }
}