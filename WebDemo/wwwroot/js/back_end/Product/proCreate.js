var selectCate = document.getElementById("tbodyResult");
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
var checkImage = false;
$(document).ready(function () {
    getDataCategories();
});


function proCre() {
    var proName = $("input[name='proName']").val();
    var proPrice = $("input[name='proPrice']").val();
    var proQuantity = $("input[name='proQuantity']").val();
    var proDescription = $("input[name='proDescription']").val();
    var myFile = $('#fileinput').prop('files');
    var proCate = selectCate.value;
    var formData = new FormData();

    if (proName == "" || proName == null || proName == undefined) {
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

    if (myFile.item(0) == null || myFile.item(0) == undefined) {
        pImage.innerHTML = icon + ' Product Image can not blank!!!';
        $("#pImage").show();
    } else {
        $("#pImage").hide();
        checkImage = true;
    }

    if (checkName == true && checkPrice == true && checkQuantity == true && checkDescription == true && checkImage == true) {
        formData.append("proName", proName);
        formData.append("proPrice", proPrice);
        formData.append("proQuantity", proQuantity);
        formData.append("proDescription", proDescription);
        formData.append("myFile", myFile.item(0));
        formData.append("proCategory", proCate);
        console.log(formData.get("myFile"));
        create(formData);
    }
};

$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

function getDataCategories() {
    $.ajax({
        type: "GET",
        url: "/AdminCategories/get_data_categories_all",
        async: false,
        success: function (res) {
            if (res.success) {
                console.log(res.data);
                let data = res.data;
                if (data != null && data != undefined) {

                    let dataRes = [];
                    for (var i = 0; i < data.length; i++) {
                        let item = data[i];
                        dataRes.push(item);
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

function create(formData) {
    $.ajax({
        type: 'POST',
        url: '/AdminProduct/create_product',
        processData: false,
        contentType: false,
        data: formData,
        async: false,
        success: function (res) {
            if (res.success) {
                toastr.success("", res.message);
                setTimeout(function () {
                    window.location.href = "/AdminProduct";
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

