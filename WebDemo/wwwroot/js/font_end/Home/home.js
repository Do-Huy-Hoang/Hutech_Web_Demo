﻿var data = null;
var btnDrop = document.getElementById('pagesDropdown');
$(document).ready(function () {
    if (sessionStorage.getItem("Page") == null) {
        $("#hHome").addClass('active');
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
                console.log(res.data);
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