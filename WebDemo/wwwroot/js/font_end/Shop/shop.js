var size = 6;
var totalPage = 1;
var list = null;
var listCate = null;
var p = 1;
var proName = null;
$(document).ready(function () {
    $("#pagination").hide();
    $("#Previous").hide();
    getDataCategories();
    setTimeout(function () {
        $("#Spinner").hide();
        $("#pagination").show();
        getDataProducts(p, proName);
    }, 300);
    
});

function getDataProducts(p, proName) {
    $.ajax({
        type: "GET",
        url: "/AdminProduct/get_data_product",
        data: { 'page': p, 'size': size, 'proName': proName },
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
                    $("#tbodyResult2").html("");
                    $("#courseTemplate2").tmpl(list).appendTo("#tbodyResult2");
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
    getDataProducts(p, proName);

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
    getDataProducts(p, proName);
    if (p + 1 > totalPage) {
        $("#Previous").show();
        $("#Next").hide();
    }
    else {
        $("#Previous").show();
        $("#Next").show();
    }
}

function getDataCategories() {
    $.ajax({
        type: "GET",
        url: "/AdminCategories/get_data_categories_all",
        async: false,
        success: function (res) {
            if (res.success) {
                let data = res.data;
                if (data != null && data != undefined) {             
                    let dataRes = [];
                    for (var i = 0; i < data.length; i++) {
                        let item = data[i];
                        dataRes.push(item);
                    }
                    listCate = dataRes;
                    $("#tbodyResult").html("");
                    $("#courseTemplate").tmpl(listCate).appendTo("#tbodyResult");
                }
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

