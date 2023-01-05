var size = 6;
var totalPage = 1;
var list = null;
var submit = null;
var p = 1;
var ordName = null;
$(document).ready(function () {
    $("#pagination").hide();
    $("#Previous").hide();
    setTimeout(function () {
        $("#Spinner").hide();
        $("#pagination").show();
        getDataOrder(1, ordName);
    }, 300);
});

function search() {
    ordName = $("input[name='orderName']").val();
    if (ordName == null || ordName == "") {
        ordName = null;
        $("#Spinner").hide();
        $("#pagination").show();
        getDataOrder(1, ordName);
    } else {
        getDataOrder(p, ordName);
    }
}

function getDataOrder(p, ordName) {
    $.ajax({
        type: "GET",
        url: "/Orders/get_data_order",
        data: { 'page': p, 'size': size, 'orderName': ordName },
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
    getDataCategories(p, ordName);

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
    getDataCategories(p, ordName);
    if (p + 1 > totalPage) {
        $("#Previous").show();
        $("#Next").hide();
    }
    else {
        $("#Previous").show();
        $("#Next").show();
    }
}

function showInfoOrder(id) {
    if (list != null && id != null && id >= 0) {
        let itm = $.grep(list, function (obj) {
            return obj.ordId == id;
        })[0];
        let qual = itm.orderDetails[0].ordDetailQuantity;
        let price = itm.orderDetails[0].ordDetailProductNavigation.proPrice;
        let total = qual * price;

        $("#txtOrdID").val(itm.ordId);
        $("#txtUserID").val(itm.ordUserId);
        $("#txtUserName").val(itm.ordName);
        $("#txtEmail").val(itm.ordEmail)
        $("#txtPhone").val(itm.ordPhoneNumber);
        $("#txtAddress").val(itm.ordAddress);
        $("#txtQuality").val(qual)
        $("#txtProductID").val(itm.orderDetails[0].ordDetailProductNavigation.proId)
        $("#txtProductName").val(itm.orderDetails[0].ordDetailProductNavigation.proName)
        $("#txtProductPrice").val("$" + price)
        $("#txtTotal").val("$"+total)
    }
}

function deleteOrder(id) {
    $("#btnDelete").click(function () {
        $.ajax({
            type: "DELETE",
            url: "/Orders/delete_order",
            data: { 'ordId': id },
            async: false,
            success: function (res) {
                if (res.success) {
                    toastr.success("", res.message);
                    getDataOrder(p, ordName);
                }
                if (res.Failed) {
                    toastr.error("", res.message);
                    getDataOrder(p, ordName);
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
