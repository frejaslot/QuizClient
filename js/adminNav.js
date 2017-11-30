$(document).ready(() => {
    const currentUser = SDK.currentUser();
    const userId = currentUser.userId;

    //Listener on log out button
    $("#logOutBtn").on("click", () => {
        //SDK request for logging out
        SDK.logOut(userId, (err, data) => {
            if (err && err.xhr.status === 400) {
                console.log("couldn't delete token");
                window.alert("An error has occurred. Please try again");
            } else {
                //Clearing the local storage upon log out
                window.location.href = "index.html";
                SDK.Storage.remove("myUser")
                SDK.Storage.remove("myToken")
                SDK.Storage.remove("selectedCourse")
                SDK.Storage.remove("selectedQuiz")
            }
        });
    });

    //SDK request for loading courses
    SDK.loadCourses((err, data) => {
        if (err) throw err;
        const courses = JSON.parse(data);
        //Listener on VØS button
        $("#vosBtn").on("click", () => {
            //SDK request for storing the selected course in local storage
            SDK.Storage.persist("selectedCourse", courses[3])
            window.location.href = "adminQuiz.html";
        });
        //Listener on DIS button
        $("#disBtn").on("click", () => {
            //SDK request for storing the selected course in local storage
            SDK.Storage.persist("selectedCourse", courses[0])
            window.location.href = "adminQuiz.html";
        });
        //Listener on ITF button
        $("#itfBtn").on("click", () => {
            //SDK request for storing the selected course in local storage
            SDK.Storage.persist("selectedCourse", courses[1])
            window.location.href = "adminQuiz.html";
        });
        //Listener on Makro button
        $("#makroBtn").on("click", () => {
            //SDK request for storing the selected course in local storage
            SDK.Storage.persist("selectedCourse", courses[2])
            window.location.href = "adminQuiz.html";
        });
    });
});
