var data = null;
var size = 8;
var list = null;
var p = 1;
var proName = null;
var listCart = new Array();
var count = 0;
var checkCart = false;
var btnDrop = document.getElementById('pagesDropdown');
var cart = document.getElementById('numcart');
$(document).ready(function () {
    if (sessionStorage.getItem("Page") == null) {
        $("#hHome").addClass('active');
        getDataProducts(p, proName);
    } else {
        $(sessionStorage.getItem("Page")).addClass('active');
    }
    getSession();
    $("#isAdmin").hide();
    if (data == null || data == undefined || data == "") {
        $("#infomation").hide();
    } else {
        btnDrop.innerHTML = data.name;
        $("#infomation").show();
        $("#frLogin").hide();
        if (data.admin == "True") {
            $("#isAdmin").show();
        }
    }
    if (window.localStorage.getItem('list_cart') != null) {
        data = JSON.parse(window.localStorage.getItem('list_cart'));
        for (var i = 0; i < data.length; i++) {
            let item = data[i];
            listCart.push(item);
        }
    }

    if (window.localStorage.getItem('numberPro') != null) {
        count = parseInt(window.localStorage.getItem('numberPro'));
    }
    cart.innerHTML = '(' + count + ')';
});

function goShop() {
    sessionStorage.setItem("Page", "#hShop");
}

function goHome() {
    sessionStorage.removeItem("Page");
}

function goPageLogin() {
    sessionStorage.setItem("Page", "#hLogin");
}

function goCart() {
    sessionStorage.setItem("Page", "#hCart");
}

function goAbout() {
    sessionStorage.setItem("Page", "#hAbout");
}

function getSession() {
    $.ajax({
        type: "GET",
        url: "/GetSession/getSe",
        async: false,
        success: function (res) {
            if (res.success) {
                data =  res.data;
            }
            else {
                data = null;
            }
        },
        failure: function (res) {
            alert(res.message);
        },
        error: function (res) {

        }
    });
}

function logout() {
    $.ajax({
        type: "POST",
        url: "/Login/signOut",
        async: false,
        success: function (res) {
            if (res.success) {
                sessionStorage.removeItem("Page");
                window.location.href = "/";
            }
            else {
                sessionStorage.removeItem("Page");
                window.location.href = "/";
            }
        },
        failure: function (res) {
            alert(res.message);
        },
        error: function (res) {

        }
    });
}

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
                    $("#tbodyResult").html("");
                    $("#courseTemplate").tmpl(list).appendTo("#tbodyResult");
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

function addCart(id) {
    if (listCart.length > 0) {
        let pro = null;
        let quan = null;
        for (let i = 0; i < listCart.length; i++) {
            if (listCart[i].product.proId == id) {
                listCart[i].product = listCart[i].product;
                listCart[i].quantity = listCart[i].quantity+1;
                checkCart = true;
            }
        }
        if (checkCart) {
            window.localStorage.setItem('list_cart', JSON.stringify(listCart));
            checkCart = false
        }else{
            let item = $.grep(list, function (obj) {
                return obj.proId == id
            })[0];
            let cartAdd = {
                product: item,
                quantity: 1,
            }
            listCart.push(cartAdd);
            window.localStorage.setItem('list_cart', JSON.stringify(listCart));
            count = count + 1;
            window.localStorage.setItem('numberPro', count);
        }
        cart.innerHTML = '(' + count + ')';
    } else {
        if (list != null && id != null && id > 0) {
            let item = $.grep(list, function (obj) {
                return obj.proId == id
            })[0];
            let cartAdd = {
                product: item,
                quantity: 1,
            }
            listCart.push(cartAdd);
            window.localStorage.setItem('list_cart', JSON.stringify(listCart));
            count = count + 1;
            window.localStorage.setItem('numberPro', count);
        }
        cart.innerHTML = '('+count+')';
    }
}

function details(id) {
    let name = document.getElementById('malName');
    let price = document.getElementById('malPrice');
    let description = document.getElementById('malDescription'); 
    let add = document.getElementById('malAdd');
    let img = document.getElementById('malImg');
    if (list != null && id != null && id > 0) {
        let item = $.grep(list, function (obj) {
            return obj.proId == id
        })[0];
        /* $("#malPrice").val(item.proPrice);*/
        name.innerHTML = item.proName
        price.innerHTML = item.proPrice;
        description.innerHTML = item.proDescription;
        img.style = "background: url(" + item.proImg + ")";
        add.onclick = addCart(id);
    }
}
