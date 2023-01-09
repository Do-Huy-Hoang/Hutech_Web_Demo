var icon = '<i class="fas fa-exclamation-circle" style="padding-right:10px;"></i>';
var checkName = false;
var checkEmail = false;
var checkPNumber = false;
var checkAddress = false;
var sesstion = null;
var data = null;
var list = null;
var Name = document.getElementById('Name');
var Email = document.getElementById('Email');
var PNumber = document.getElementById('PNumber');
var Address = document.getElementById('Address');
var pro = document.getElementById('tbodyResult');
var STotal = document.getElementById('totalSum');
$(document).ready(function () {
    getSession();
    data = JSON.parse(window.localStorage.getItem('list_cart'));
    if (data != null) {
        let dataRes = [];
        for (var i = 0; i < data.length; i++) {
            let item = data[i];
            dataRes.push(item);
        }
        list = dataRes;
        $("#courseCheckTemplate").tmpl(list).appendTo("#tbodyCheckResult");
        STotal.innerHTML = Sumtotal();
    } else {
        STotal.innerHTML = "0";
    }
})

function checkOut() {
    var name = $("input[name='name']").val();
    var email = $("input[name='email']").val();
    var phone = $("input[name='phone']").val();
    var address = $("input[name='address']").val();
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (name == "" || name == null || name == undefined) {
        Name.innerHTML = icon + ' Your name can not blank!!!';
        $("#Name").show();
    } else {
        $("#Name").hide();
        checkName = true;
    }

    if (email == "" || email == null || email == undefined) {
        Email.innerHTML = icon + ' Email can not blank!!!';
        $("#Email").show();
    }
    else if (!filter.test(email)) {
        Email.innerHTML = 'Email malformed!!!';
        $("#Email").show();
    }
    else {
        $("#Email").hide();
        checkEmail = true;
    }

    if (phone == "" || phone == null || phone == undefined) {
        PNumber.innerHTML = icon + ' Phone number can not blank!!!';
        $("#PNumber").show();
    } else {
        $("#PNumber").hide();
        checkPNumber = true;
    }

    if (address == "" || address == null || address == undefined) {
        Address.innerHTML = icon + ' Address name can not blank!!!';
        $("#Address").show();
    } else {
        $("#Address").hide();
        checkAddress = true;
    }
}

function createOrder() {

}

function getSession() {
    $.ajax({
        type: "GET",
        url: "/GetSession/getSe",
        async: false,
        success: function (res) {
            if (res.success) {
                sesstion = res.data;
            }
            else {
                sesstion = null;
            }
        },
        failure: function (res) {
            alert(res.message);
        },
        error: function (res) {

        }
    });
}

function Sumtotal() {
    let total = 0;
    for (var i = 0; i < list.length; i++) {
        let pss = list[i].product.proPrice.replaceAll(".", "");
        total = total + (parseInt(pss) * list[i].quantity);
    }
    let strTotal = String(total);
    let count = strTotal.length;
    for (var i = 0; i < count; i++) {
        if (count - 1 > i) {
            count = count - 3;
            strTotal = strTotal.slice(0, count) + "." + strTotal.slice(count);
        }
    }
    return strTotal;
}

function total(a, b) {
    let pss = a.replaceAll(".", "");
    let total = String(parseInt(pss) * parseInt(b));
    let count = total.length;
    for (var i = 0; i < count; i++) {
        if (count - 1 > i) {
            count = count - 3;
            total = total.slice(0, count) + "." + total.slice(count);
        }
    }
    return total;
};