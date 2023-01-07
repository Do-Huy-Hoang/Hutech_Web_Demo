var message = document.getElementById('message');
var icon = '<i class="fas fa-exclamation-circle" style="padding-right:10px;"></i>';
$(document).ready(function () {

});


function createCate() {
    var cateName = $("input[name='cateName']").val();
    if (cateName == "" || cateName == null || cateName == undefined) {
        message.innerHTML = icon + 'Cate name can not blank!!!';
        $("#message").show();
    } else {
        $("#message").hide();
        create(cateName);
    }
}

function create(cateName) {
    $.ajax({
        type: 'POST',
        url: '/AdminCategories/create_category',
        data: { 'cateName': cateName },
        async: false,
        success: function (res) {
            if (res.success) {
                toastr.success("", res.message)
                setTimeout(function () {
                    window.location.href = "/AdminCategories";
                }, 1000)
                
            }
            else {
                if (res.Check) {
                    toastr.error("", res.message)
                } else {
                    message.innerHTML = icon + res.message;
                    $("#message").show();
                }         
            }
        },
        failure: function (res) {
            alert(res.message);
        },
        error: function (res) {

        }
    });
    return false;
}

