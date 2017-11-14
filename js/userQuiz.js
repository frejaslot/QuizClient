$(document).ready(() => {
    const currentUser = SDK.currentUser();

    $("#profile-button").on("click", () => {

        window.location.href = "user.html";
    });

    $("#result-button").on("click", () => {

        window.location.href = "userResult.html";
    });

    $("#quiz-button").on("click", () => {

        window.location.href = "userQuiz.html";
    });

    $("#logOut-button").on("click", () => {

        const userId = currentUser.userId;
        SDK.logOut(userId, (err, data) => {
            if(err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            } else {
                window.location.href = "index.html";
                SDK.Storage.remove("myUser")
                SDK.Storage.remove("myToken")
            }
        });
    });
});