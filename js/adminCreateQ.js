$(document).ready(() => {
    const currentUser = SDK.currentUser();

    $("#logOut-button").on("click", () => {
        const userId = currentUser.userId;
        SDK.logOut(userId, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            } else {
                window.location.href = "index.html";
                SDK.Storage.remove("myUser")
                SDK.Storage.remove("myToken")
                SDK.Storage.remove("chosenCourse")
                SDK.Storage.remove("chosenQuiz")
            }
        });
    });

    SDK.loadCourses((err, data) => {
        if (err) throw err;
        const courses = JSON.parse(data);
        console.log(courses);

        $("#vos-button").on("click", () => {
            SDK.Storage.persist("chosenCourse", courses[3])
            window.location.href = "adminQuiz.html";
        });

        $("#dis-button").on("click", () => {
            SDK.Storage.persist("chosenCourse", courses[0])
            window.location.href = "adminQuiz.html";
        });

        $("#itf-button").on("click", () => {
            SDK.Storage.persist("chosenCourse", courses[1])
            window.location.href = "adminQuiz.html";
        });
        $("#makro-button").on("click", () => {
            SDK.Storage.persist("chosenCourse", courses[2])
            window.location.href = "adminQuiz.html";
        });
    });

    $("#return-button").on("click", () => {
        window.location.href = "adminQuiz.html";
    });

    $("#createQuiz-button").on("click", () => {

        const createdBy = $("#quizAuthor").val();
        const quizTitle = $("#quizTitle").val();
        const quizDescription = $("#quizDescription").val();

        if(!qTitle || !qDescription || !qAuthor) {
            alert("Information is missing. Please try again");
        } else {





        }
    });

});
