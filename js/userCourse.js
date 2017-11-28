$(document).ready(() => {
    const currentUser = SDK.currentUser();

    $("#logOut-button").on("click", () => {

        const userId = currentUser.userId;
        SDK.logOut(userId, (err, data) => {
            if(err && err.xhr.status === 401) {
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

    SDK.loadCourses((err, data)=>{
        const courses = JSON.parse(data);
        console.log(courses);

        $.each(courses, (i, val) => {
            var tr = '<tr>';
            tr += '<td> <button class="courseBtn btn btn-lg btn-default btn-block" data-key="' + (i+1) + '">'+courses[i].courseTitle + '</button></td>';
            $("#courseList").append(tr);
        });

        $('button.courseBtn').on('click', function () {
            var name = $(this).text();
            window.location.href = "userQuiz.html";

            for (var i = 0; i < courses.length; i++) {
                if (name === courses[i].courseTitle) {
                    SDK.Storage.persist("chosenCourse", courses[i])
                }
            }

        });

    });
});