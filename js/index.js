$(document).ready(() => {

    $("#signup-button").on("click", () => {
        window.location.href = "signUp.html";
    });


    $("#login-button").on("click", () => {

        let username = $("#username").val();
        let password = $("#password").val();

        if (!username || !password) {
            window.alert("Username or password has not been typed. Please try again");
        } else {
            SDK.logIn(username, password, (err, data) => {
                if (err && err.xhr.status === 401) {
                    window.alert("Wrong username or password");
                }
                else if (err) {
                    console.log("Error");
                    window.alert("Wrong username or password");
                } else if (SDK.Storage.load("myToken") === null) {
                    window.alert("This user does not exist");
                }
                else {
                    SDK.loadCurrentUser((err, data) => {
                        if (err && err.xhr.status === 401) {
                            window.alert("Wrong username or password");
                        } else {
                            console.log(data)
                            if (SDK.currentUser().type === 1) {
                                window.location.href = "admin.html";
                            } else if (SDK.currentUser().type === 2) {
                                window.location.href = "userCourse.html";
                            }
                        }
                    });
                }
            });
        }
    });
});
