var message = document.getElementById('message');
var messagerg = document.getElementById('messagerg');
$(document).ready(function () {
    $("#frmSignUp").hide();
});

function goSign() {
    $("#frmLogin").hide();
    $("#frmSignUp").show();
    $("#message").hide();
    $("input[name='lgUserName']").val("");
    $("input[name='lgPassword']").val("");
}

function goLogin() {
    $("#frmLogin").show();
    $("#frmSignUp").hide();
    $("#messagerg").hide();
    $("input[name='rgUserName']").val("");
    $("input[name='rgPassword']").val("");
    $("input[name='rgConfirmPassword']").val("");
    $("input[name='rgEmail']").val("");
}

function btnLogin() {
    let userName = $("input[name='lgUserName']").val();
    let password = $("input[name='lgPassword']").val();
    if ((userName == "" || userName == undefined || userName == null) && (password == "" || password == undefined || password == null)) {
        message.innerHTML = 'User name and password can not blank!!!';
        $("#message").show();
    } else {
        if (userName == "" || userName == undefined || userName == null) {
            message.innerHTML = 'User name can not blank!!!';
            $("#message").show();
        } else {
            if (password == "" || password == undefined || password == null) {
                message.innerHTML = 'Password can not blank!!!';
                $("#message").show();
            } else {
                $("#message").hide();
                sessionStorage.removeItem("Page");
                login(userName, password);
            }
        }    
    } 
}

function login(userName, password) {
    $.ajax({
        type: "POST",
        url: "/Login/doLogin",
        data: { 'userName': userName, 'password': password },
        async: false,
        success: function (res) {
            if (res.success) {
                window.location.href = "/";
            }
            else {
                message.innerHTML = res.message;
                $("#message").show();
            }
        },
        failure: function (res) {
            alert(res.message);
        },
        error: function (res) {

        }
    });
}

function btnRegister() {
    let userName = $("input[name='rgUserName']").val();
    let password = $("input[name='rgPassword']").val();
    let confrimPassword = $("input[name='rgConfirmPassword']").val();
    let email = $("input[name='rgEmail']").val();
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if ((userName == "" || userName == undefined || userName == null) && (password == "" || password == undefined || password == null)
        && (confrimPassword == "" || confrimPassword == undefined || confrimPassword == null)
        && (email == "" || email == undefined || email == null)) {
        messagerg.innerHTML = 'User name,email, password and confirm password can not blank!!!';
        $("#messagerg").show();
    } else {
        if (userName == "" || userName == undefined || userName == null) {
            messagerg.innerHTML = 'User name can not blank!!!';
            $("#messagerg").show();
        } else {
            if (email == "" || email == undefined || email == null) {
                messagerg.innerHTML = 'Email can not blank!!!';
                $("#messagerg").show();
            } else {
                if (!filter.test(email)) {
                    messagerg.innerHTML = 'Email malformed!!!';
                    $("#messagerg").show();
                } else {
                    if (password == "" || password == undefined || password == null) {
                        messagerg.innerHTML = 'Password can not blank!!!';
                        $("#messagerg").show();
                    } else {
                        if (confrimPassword == "" || confrimPassword == undefined || confrimPassword == null) {
                            messagerg.innerHTML = 'Confirm Password can not blank!!!';
                            $("#messagerg").show();
                        } else {
                            if (password != confrimPassword) {
                                messagerg.innerHTML = 'Password is not like Confirm Password!!!';
                                $("#messagerg").show();
                            } else {
                                $("#messagerg").hide();
                                register(userName, password, email);
                            }
                        }
                    }
                }
            }
            
        }
    }
}

function register(userName, password, email) {
    $.ajax({
        type: "POST",
        url: "/Login/create_user",
        data: { 'userName': userName, 'password': password, 'email': email },
        async: false,
        success: function (res) {
            if (res.success) {
                login(userName, password);
            }
            else {
                message.innerHTML = res.message;
                $("#message").show();
            }
        },
        failure: function (res) {
            alert(res.message);
        },
        error: function (res) {

        }
    });
}