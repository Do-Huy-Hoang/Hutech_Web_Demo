var data = null;
var btnDrop = document.getElementById('adminName');
$(document).ready(function () {
    getSession();
    btnDrop.innerHTML = data.name;
    if (window.localStorage.getItem("numberPro") != null) {
        count = window.localStorage.getItem("numberPro");
    }
});

function getSession() {
    $.ajax({
        type: "GET",
        url: "/GetSession/getSe",
        async: false,
        success: function (res) {
            if (res.success) {
                console.log(res.data);
                data = res.data;
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


