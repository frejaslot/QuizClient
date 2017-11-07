$(document).ready(() => {

    SDK.User.loadNav();

    $("#signup-button").click(() => {

        window.location.href = "signUp.html";

    });

    $("#login-button").click(() => {

        window.location.href = "myPage.html";

    });

});