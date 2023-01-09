var size = 6;
var totalPage = 1;
var list = null;
var listCate = null;
var listCart = null;
var dataCart = null;
var count = null;
var submit = null;
var p = 1;
var proName = null;
var selectCate = document.getElementById("tbodyResult2");
var getImg = document.getElementById("getImg");
var icon = '<i class="fas fa-exclamation-circle" style="padding-right:10px;"></i>';
var pName = document.getElementById('pName');
var pPrice = document.getElementById('pPrice');
var pQuantity = document.getElementById('pQuantity');
var pDescription = document.getElementById('pDescription');
var pImage = document.getElementById('pImage');
var checkName = false;
var checkPrice = false;
var checkQuantity = false;
var checkDescription = false;
$(document).ready(function () {
    $("#pagination").hide();
    $("#Previous").hide();
    setTimeout(function () {
        $("#Spinner").hide();
        $("#pagination").show();
        getDataProducts(1, proName);
    }, 300);
    dataCart = JSON.parse(window.localStorage.getItem('list_cart'));
    count = window.localStorage.getItem('numberPro')
    if (dataCart != null) {
        let dataCartRes = [];
        for (var i = 0; i < dataCart.length; i++) {
            let item = dataCart[i];
            dataCartRes.push(item);
        }
        listCart = dataCartRes;
    }
});

function search() {
    proName = $("input[name='proName']").val();
    if (proName == null || proName == "") {
        proName = null;
        $("#Spinner").hide();
        $("#pagination").show();
        getDataProducts(1, proName);
    } else {
        getDataProducts(p, proName);
    }
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

function showInfo(id) {
    $("#pName").hide();
    $("#pPrice").hide();
    $("#pQuantity").hide();
    $("#pDescription").hide();
    if (list != null && id != null && id > 0) {
        let item = $.grep(list, function (obj) {
            return obj.proId == id
        })[0];
        $("#txtName").val(item.proName);
        $("#txtId").val(item.proId);
        $("#txtPrice").val(item.proPrice);
        $("#txtQuantity").val(item.proQuantity);
        $("#txtDescription").val(item.proDescription);
        $("#txtCreatAt").val(item.createAt);
        getDataCategories();   
        selectCate.value = item.proCategory;
        getImg.innerHTML = '<img src="' + item.proImg + '" class="img-thumbnail"  height="100" width="100">';
    }
  
}

function save() {
    var proName = $("#txtName").val();
    var proPrice = $("#txtPrice").val();
    var proQuantity = $("#txtQuantity").val();
    var proDescription = $("#txtDescription").val();
    var myFile = $('#fileinput').prop('files');
    var proCate = selectCate.value;
    var formData = new FormData();

    if (proName == "" || proName == null || proName == undefined) {
        $("#modal-lg").show();
        pName.innerHTML = icon + ' Product name can not blank!!!';
        $("#pName").show();
    } else {
        $("#pName").hide();
        checkName = true;
    }

    if (proPrice == "" || proPrice == null || proPrice == undefined) {
        pPrice.innerHTML = icon + ' Product Price can not blank!!!';
        $("#pPrice").show();
    } else {
        const regex = /^(\d{1,3})(\.\d{3})*(\.\d{3})?$/gm;
        var passed = regex.exec(proPrice);
        if (passed != null) {
            var tprice = proPrice.replaceAll(".", "");
            var nprice = parseInt(tprice);
            if (nprice > 1000 && nprice < 100000000) {
                $("#pPrice").hide();
                checkPrice = true;
            } else {
                pPrice.innerHTML = icon + ' Product Price must be greater than 1.000 and less than 100.000.000!!!';
                $("#pPrice").show();
            }
        } else {
            pPrice.innerHTML = icon + ' Product Price must be format VND, example: 1.000.000!!!';
            $("#pPrice").show();
        }
    }

    if (proQuantity == "" || proQuantity == null || proQuantity == undefined) {
        pQuantity.innerHTML = icon + ' Product Quantity can not blank!!!';
        $("#pQuantity").show();
    } else {
        if (proQuantity > 0 && proQuantity < 10000) {
            $("#pQuantity").hide();
            checkQuantity = true;
        } else {
            pQuantity.innerHTML = icon + ' Product Quantity  must be greater than 0 and less than 10.000!!!';
            $("#pQuantity").show();
        }

    }

    if (proDescription == "" || proDescription == null || proDescription == undefined) {
        pDescription.innerHTML = icon + ' Product Description can not blank!!!';
        $("#pDescription").show();
    } else {
        $("#pDescription").hide();
        checkDescription = true;
    }
    if (checkName == true && checkPrice == true && checkQuantity == true && checkDescription == true) {
        var myFile = $('#fileinput').prop('files');
        var proCate = selectCate.value;
        if ($("#txtId").val() != "" && $("#txtId").val() != null && $("#txtId").val() != undefined) {
            var formData = new FormData();
            formData.append("proId", $("#txtId").val());
            formData.append("proName", $("#txtName").val());
            formData.append("proPrice", $("#txtPrice").val());
            formData.append("proQuantity", $("#txtQuantity").val());
            formData.append("proDescription", $("#txtDescription").val());
            formData.append("myFile", myFile.item(0));
            formData.append("proCategory", proCate);
            formData.append("createAt", $("#txtCreatAt").val());
            update(formData);
        }
    }
}

function update(formData) {
    $.ajax({
        type: "POST",
        url: "/AdminProduct/update_product",
        processData: false,
        contentType: false,
        data: formData,
        async: false,
        success: function (res) {
            if (res.success) {
                toastr.success("", res.message);
                if (listCart != null) {
                    for (let i = 0; i < listCart.length; i++) {
                        if (listCart[i].product.proId == formData.get("proId")) {
                            listCart.splice(i, 1);
                            count = count - 1;
                        }
                    }
                    window.localStorage.setItem('list_cart', JSON.stringify(listCart));
                    window.localStorage.setItem('numberPro', count)
                }
                setTimeout(function () {
                    window.location.href = "/AdminProduct";
                }, 1000);
               
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
            url: "/AdminProduct/delete_product",
            data: { 'proId': id },
            async: false,
            success: function (res) {
                if (res.success) {
                    toastr.success("", res.message);
                    getDataProducts(p);
                }
                if (res.Failed) {
                    toastr.error("", res.message);
                    getDataProducts(p);
                }
            },
            failure: function (res) {
                alert(res.message);
            },
            error: function (res) {

            }
        });
    })
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
                    $("#tbodyResult2").html("");
                    $("#courseTemplate2").tmpl(listCate).appendTo("#tbodyResult2");
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

$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

