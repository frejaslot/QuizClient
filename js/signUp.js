$(document).ready(() => {

    $("#return-button").on("click", () => {

        window.location.href = "index.html";

    });

    $("#create-button").on("click", () => {

        const username = $("#username").val();
        const password = $("#password").val();
        const passwordV = $("#passwordV").val();

        if(!username || !password || !passwordV) {
            alert("Username or password has not been typed. Please try again");
        } else {
            if(password.valueOf() === passwordV.valueOf()) SDK.signup(username, password, (err, data) => {
                if (err && err.xhr.status == 400) {
                    console.log("Client fail");
                }
                else if (err) {
                    console.log("Error");
                } else {
                    window.alert("The account is successfully created");

                    window.location.href = "index.html"
                }
            }); else {
                alert("Password doesn't match. Please try again");
            }

        }
    });
});