var data = null;
var list = null;
var cart = document.getElementById('tbodyCartResult');
$(document).ready(function () {
    data = JSON.parse(window.localStorage.getItem('list_cart'));
    if (data != null) {
        let dataRes = [];
        for (var i = 0; i < data.length; i++) {
            let item = data[i];
            dataRes.push(item);
        }
        list = dataRes;
       
        $("#tbodyCartResult").html("");
        $("#courseCartTemplate").tmpl(list).appendTo("#tbodyCartResult");
    } else {
        $("#tbodyCartResult").addClass('text-center');
        cart.innerHTML = "There are no products in the cart";
    }
});

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