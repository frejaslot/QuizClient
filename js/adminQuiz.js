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

    SDK.loadQuizzes((err, data) => {
        if (err) throw err;
        const quizzes = JSON.parse(data);
        console.log(quizzes);

        $("#tablehead").append("<thead>\n" +
            "<th>Title</th>\n" +
            "<th>Description</th>\n" +
            "<th>Created By</th>\n" +
            "<th>Question Count</th>\n" +
            "<th><button class=\"quizCreateBtn btn btn-success pull-left\">Create quiz</button></th>\n" +
            "</thead>")

        $.each(quizzes, function (i, val) {
            var tr = '<tr>';
            tr += '<td>' + quizzes[i].quizTitle + '</td>';
            tr += '<td>' + quizzes[i].quizDescription + '</td>';
            tr += '<td>' + quizzes[i].createdBy + '</td>';
            tr += '<td>' + quizzes[i].questionCount + '</td>';
            tr += '<td><button class="quizDelBtn btn btn-danger pull-left" data-key="' + (i+1) + '">Delete quiz</button></td>';
            tr += '</tr>';
            i + 1;
            $("#quizList").append(tr);
        });

        $('button.quizCreateBtn').on('click', function () {
            window.location.href = "adminCreateQ.html";
        });

        $('button.quizDelBtn').on('click', function () {

            if (window.confirm("Do you want to delete this quiz?")) {
                var name = $(this).closest("tr").find("td:eq(0)").text();

                for (var i = 0; i < quizzes.length; i++) {
                    if (name === quizzes[i].quizTitle) {
                        SDK.Storage.persist("chosenQuiz", quizzes[i]);
                    }
                }
                SDK.deleteQuiz((err, data) => {});
                location.reload();
            }
        });
    });
});