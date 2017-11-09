$(document).ready(() => {

    $("#signup-button").on("click", () => {

        window.location.href = "signUp.html";

    });

    $("#login-button").on("click", () => {

        const username = $("#inputUsername").val();
        const password = $("#inputPassword").val();

        SDK.User.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err){
                console.log("BAd stuff happened")
            } else {
                window.location.href = "my-page.html";
            }
        });


    });

});