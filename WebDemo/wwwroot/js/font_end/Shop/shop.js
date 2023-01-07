var list = null;
$(document).ready(function () {
    getDataCategories();
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
