$(document).ready(() => {

    //SDK request to get current user
    const currentUser = SDK.currentUser();
    const userId = currentUser.userId;

    //Listener on log out button
    $("#logOutBtn").on("click", () => {
        //SDK request for logging out
        SDK.logOut(userId, (err, data) => {
            if(err && err.xhr.status === 400) {
                console.log("couldn't delete token");
                window.alert("An error has occurred. Please try again");
            } else {
                //Clearing the local storage upon log out
                window.location.href = "index.html";
                SDK.Storage.remove("myUser");
                SDK.Storage.remove("myToken");
                SDK.Storage.remove("selectedCourse");
                SDK.Storage.remove("selectedQuiz");
            }
        });
    });

    //Display username in table
    $(".myUser").html(`<h5>${currentUser.username}</h5>`);
});
