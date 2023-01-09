var size = 6;
var totalPage = 1;
var list = null;
var p = 1;
var ordName = null;

$(document).ready(function () {
    $("#pagination").hide();
    $("#Previous").hide();
    setTimeout(function () {
        $("#Spinner").hide();
        $("#pagination").show();
        getDataOrderUser(1, ordName);
    }, 300);
});

function getDataOrderUser(p, ordName) {
    $.ajax({
        type: "GET",
        url: "/OrderUser/get_data_order_user",
        data: { 'page': p, 'size': size, 'orderName': ordName },
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
                    if (data.totalPage == 1) {
                        $("#pagination").hide();
                    }
                    $("#OrdUserResult").html("");
                    $("#ordUserTemplate").tmpl(list).appendTo("#OrdUserResult");
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
    getDataOrderUser(p, ordName);

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
    getDataOrderUser(p, ordName);
    if (p + 1 > totalPage) {
        $("#Previous").show();
        $("#Next").hide();
    }
    else {
        $("#Previous").show();
        $("#Next").show();
    }
}

function showInfoOrderUser(id) {
    if (list != null && id != null && id >= 0) {
        let itm = $.grep(list, function (obj) {
            return obj.ordId == id;
        })[0];
        let qual = itm.orderDetails[0].ordDetailQuantity;
        let price = itm.orderDetails[0].ordDetailProductNavigation.proPrice;
        var pri = parseFloat(price)
        let total = qual * pri;
        var tol = total.toLocaleString();
        console.log(qual)
        console.log(pri)
        console.log(tol)
        
        $("#txtOrdID").val(itm.ordId);
        $("#txtUserID").val(itm.ordUserId);
        $("#txtUserName").val(itm.ordName);
        $("#txtCategory").val(itm.orderDetails[0].ordDetailProductNavigation.proCategoryNavigation.cateName)
        $("#txtEmail").val(itm.ordEmail)
        $("#txtPhone").val(itm.ordPhoneNumber);
        $("#txtAddress").val(itm.ordAddress);
        $("#txtQuality").val(qual)
        $("#txtProductID").val(itm.orderDetails[0].ordDetailProductNavigation.proId)
        $("#txtProductName").val(itm.orderDetails[0].ordDetailProductNavigation.proName)
        $("#txtProductPrice").val(price + "VND")
        
        if (total < 9.99 || tol < 9.99) {
            $("#txtTotal").val(tol + ".000 VND")
            $("#txtTotalPaid").val(tol + ".000 VND")
        }
        else if (total < 99.99) {
            $("#txtTotal").val(total + "0.000 VND")
            $("#txtTotalPaid").val(total + "0.000 VND")
        } else {
            $("#txtTotal").val(total + ".000 VND")
            $("#txtTotalPaid").val(total + ".000 VND")
        }
    }
}
