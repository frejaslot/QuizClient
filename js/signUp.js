$(document).ready(() => {

    //Listener on return button
    $("#returnBtn").on("click", () => {
        window.location.href = "index.html";
    });

    //Listener on create button
    $("#createBtn").on("click", () => {
        //Saving user inputs as const
        const username = $("#username").val();
        const password = $("#password").val();
        const passwordV = $("#passwordV").val();

        //Verify that all inputs has been typed
        if(!username || !password || !passwordV) {
            window.alert("Username or password has not been typed. Please try again");
        } else {
            //Making sure passwords match
            if(password.valueOf() === passwordV.valueOf()) {
                //SDK request for signing up
                SDK.signUp(username, password, (err, data) => {
                    if (err && err.xhr.status == 400) {
                        window.alert("This user does already exist");
                    } else if (err) {
                        window.alert("An error has occurred. Please try again");
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