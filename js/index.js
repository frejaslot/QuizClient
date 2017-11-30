$(document).ready(() => {

    //Listener on sign up button
    $("#signUpBtn").on("click", () => {
        window.location.href = "signUp.html";
    });

    //Listener on log in button
    $("#logInBtn").on("click", () => {
        //Saving user inputs as const
        const username = $("#username").val();
        const password = $("#password").val();

        //Verify that all inputs has been typed
        if (!username || !password) {
            window.alert("Username or password has not been typed. Please try again");
        } else {
            //SDK request for logging in
            SDK.logIn(username, password, (err, data) => {
                if (err && err.xhr.status === 401) {
                    window.alert("Wrong username or password");
                } else if (err) {
                    window.alert("An error has occurred. Please try again");
                //Verify that token is created for user
                } else if (SDK.Storage.load("myToken") == null) {
                    window.alert("This user does not exist");
                } else {
                    // SDK request for loading current user
                    SDK.loadCurrentUser((err, data) => {
                        if (err && err.xhr.status === 401) {
                            window.alert("Wrong username or password");
                        } else if (err) {
                                window.alert("An error has occurred. Please try again");
                        } else {
                            //SDK request for finding user type
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
