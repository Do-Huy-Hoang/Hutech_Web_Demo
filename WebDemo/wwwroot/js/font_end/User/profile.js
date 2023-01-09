var data = null;
var information = document.getElementById('information');
var edit = document.getElementById('edit');
var changePassword = document.getElementById('changePassword');

var usrName = document.getElementById('usrName');
var email = document.getElementById('email');
var usrphone = document.getElementById('usrphone');
var usrAddress = document.getElementById('usrAddress');
$(document).ready(function () {
    information.innerHTML = '<a class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" onclick="goInformation()">Information</a>';
    edit.innerHTML = '<a class="nav-link" id="pills-profile-tab" data-toggle="pill" role="tab" aria-controls="pills-profile" aria-selected="false" onclick="goEdit()">Eidt</a>';
    changePassword.innerHTML = ' <a class="nav-link" id="pills-contact-tab" data-toggle="pill"  role="tab" aria-controls="pills-contact" aria-selected="false" onclick="goChangePassword()">Change Password</a>';
    $("#tabInformation").show();
    $("#tabEdit").hide();
    $("#tabChangePassword").hide();
    getUser();
    usrName.innerHTML = data[0].userName;
    email.innerHTML = data[0].userEmail;
    usrphone.innerHTML = data[0].userPhoneNumber;
    usrAddress.innerHTML = data[0].userAddress;
    $("#txtuserID").val(data[0].userId);
    $("#txtuserName").val(data[0].userName);
    $("#txtuserEmail").val(data[0].userEmail)
    $("#txtuserPhone").val(data[0].userPhoneNumber);
    $("#txtuserAddress").val(data[0].userAddress);
});

function goEdit() {
    information.innerHTML = '<a class="nav-link " id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="false" onclick="goInformation()">Information</a>';
    edit.innerHTML = '<a class="nav-link active" id="pills-profile-tab" data-toggle="pill" role="tab" aria-controls="pills-profile" aria-selected="true" onclick="goEdit()">Eidt</a>';
    changePassword.innerHTML = ' <a class="nav-link" id="pills-contact-tab" data-toggle="pill"  role="tab" aria-controls="pills-contact" aria-selected="false" onclick="goChangePassword()">Change Password</a>';
    $("#tabInformation").hide();
    $("#tabEdit").show();
    $("#tabChangePassword").hide();
}

function goInformation() {
    information.innerHTML = '<a class="nav-link active" id="home-tab" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true" onclick="goInformation()">Information</a>';
    edit.innerHTML = '<a class="nav-link" id="profile-tab" data-toggle="tab"  role="tab" aria-controls="profile" aria-selected="false" onclick="goEdit()">Eidt</a>';
    changePassword.innerHTML = ' <a class="nav-link" id="pills-contact-tab" data-toggle="pill"  role="tab" aria-controls="pills-contact" aria-selected="false" onclick="goChangePassword()">Change Password</a>';
    $("#tabInformation").show();
    $("#tabEdit").hide();
    $("#tabChangePassword").hide();
    $("#txtuserID").val(data[0].userId);
    $("#txtuserName").val(data[0].userName);
    $("#txtuserEmail").val(data[0].userEmail)
    $("#txtuserPhone").val(data[0].userPhoneNumber);
    $("#txtuserAddress").val(data[0].userAddress);
}

function goChangePassword() {
    information.innerHTML = '<a class="nav-link " id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="false" onclick="goInformation()">Information</a>';
    edit.innerHTML = '<a class="nav-link " id="profile-tab" data-toggle="tab"  role="tab" aria-controls="profile" aria-selected="false" onclick="goEdit()">Eidt</a>';
    changePassword.innerHTML = ' <a class="nav-link active" id="pills-contact-tab" data-toggle="pill"  role="tab" aria-controls="pills-contact" aria-selected="true" onclick="goChangePassword()">Change Password</a>';
    $("#tabInformation").hide();
    $("#tabEdit").hide();
    $("#tabChangePassword").show();
    $("#txtuserID").val(data[0].userId);
    $("#txtuserName").val(data[0].userName);
    $("#txtuserEmail").val(data[0].userEmail)
    $("#txtuserPhone").val(data[0].userPhoneNumber);
    $("#txtuserAddress").val(data[0].userAddress);
}

function getUser() {
    $.ajax({
        type: "GET",
        url: "/Profile/getUser",
        async: false,
        success: function (res) {
            if (res.success) {
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

function save() {
    var formData = new FormData();
    formData.append("UserId", $("#txtuserID").val());
    formData.append("UserName", $("#txtuserName").val());
    formData.append("UserEmail", $("#txtuserEmail").val());
    formData.append("UserPhoneNumber", $("#txtuserPhone").val());
    formData.append("UserAddress", $("#txtuserAddress").val());
    update(formData);
}

function update(formData) {
    $.ajax({
        type: "POST",
        url: "/Profile/update_User",
        processData: false,
        contentType: false,
        data: formData,
        async: false,
        success: function (res) {
            if (res.success) {
                toastr.success("", res.massage);
                getUser();
            } else {
                toastr.error("", res.message);
            }
        },
        failure: function (res) {
            alert(res.message);
        },
        error: function (res) {

        }
    });
}

function changPassword() {
    let oldPassword = $("input[name='oldPassword']").val();
    let password = $("input[name='rgPassword']").val();
    let confrimPassword = $("input[name='rgConfirmPassword']").val();
    if ((oldPassword == "" || oldPassword == undefined || oldPassword == null) && (password == "" || password == undefined || password == null)
        && (confrimPassword == "" || confrimPassword == undefined || confrimPassword == null)) {
        messagerg.innerHTML = 'Old password, password and confirm password can not blank!!!';
        $("#messagerg").show();
    } else {
        if (oldPassword == "" || oldPassword == undefined || oldPassword == null) {
            messagerg.innerHTML = 'Old password can not blank!!!';
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
                        change(oldPassword, password);
                    }
                }
            }
        }
    }

}

function change(oldPassword, password) {
    $.ajax({
        type: "POST",
        url: "/Login/change_pass",
        data: { 'oldPass': oldPassword, 'newPAss': password },
        async: false,
        success: function (res) {
            if (res.success) {
                toastr.success("", res.massage);
                setTimeout(function () {
                    window.location.href = "/Profile";
                }, 1000)    
            } else {
                toastr.error("", res.message);
            }
        },
        failure: function (res) {
            alert(res.message);
        },
        error: function (res) {

        }
    });
}
