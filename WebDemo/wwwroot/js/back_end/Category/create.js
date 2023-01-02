$(document).ready(function () {
    var submit = $("button[type='submit']");
    submit.click(function () {
        var cateName = $("input[name='cateName']").val();
        $.ajax({
            type: 'POST',
            url: '/Categories/create_category',
            data: { 'cateName': cateName },
            async: false,
            success: function (res) {
                if (res.success) {
                    toastr.success("", res.message)
                    setTimeout(function () {
                        window.location.href = "/Categories";
                    },1000)
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
        return false;
    });
});

