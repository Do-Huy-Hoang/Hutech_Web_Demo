var data = null;
var list = null;
var cart = document.getElementById('tbodyCartResult');
var STotal = document.getElementById('tbodyCartResult');
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
        SumTotal.innerHTML = Sumtotal();
    } else {
        $("#tbodyCartResult").addClass('text-center');
        cart.innerHTML = "There are no products in the cart";
        SumTotal.innerHTML = "0";
    }
    
});

function Sumtotal() {
    let total = 0;
    for (var i = 0; i < list.length; i++) {
        let pss = list[i].product.proPrice.replaceAll(".", "");
        total = total + (parseInt(pss) * list[i].quantity) ; 
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

function removeCart(id) {
    if (list != null) {
        if (list.length == 1) {
            window.localStorage.removeItem('list_cart');
            window.localStorage.removeItem('numberPro');
            window.location.href = "/ShoppingCart";
        } else {
            for (let i = 0; i < list.length; i++) {
                if (list[i].product.proId == id) {
                    list.splice(i, 1);
                    count = count - 1;
                }
            }
            window.localStorage.setItem('list_cart', JSON.stringify(list));
            window.localStorage.setItem('numberPro', count);
            window.location.href = "/ShoppingCart";
        }
        
       
    }
}

function goToCheckOut() {
    if (data != null) {
        window.location.href = "/CheckOut";
    }
}