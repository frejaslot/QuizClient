$(document).ready(() => {

    $("#returnBtn").on("click", () => {
        window.location.href = "index.html";
    });

    $("#createBtn").on("click", () => {
        const username = $("#username").val();
        const password = $("#password").val();
        const passwordV = $("#passwordV").val();

        if(!username || !password || !passwordV) {
            alert("Username or password has not been typed. Please try again");
        } else {
            if(password.valueOf() === passwordV.valueOf()) {
                SDK.signUp(username, password, (err, data) => {
                    if (err && err.xhr.status == 400) {
                        window.alert("This user does already exist");
                    } else if (err) {
                        console.log("Error");
                    } else {
                        window.alert("The account is successfully created");
                        window.location.href = "index.html"
                    }
                });
            } else {
                alert("Password doesn't match. Please try again");
            }
        }
    });
});