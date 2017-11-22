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
                SDK.Storage.remove("courseId")
            }
        });
    });

    SDK.loadCourses((err, data) => {
        if (err) throw err;
        const courses = JSON.parse(data);
        console.log(courses);

        $("#vos-button").on("click", () => {
            SDK.Storage.persist("courseId", 1)
            window.location.href = "adminDIS.html";
        });
        $("#dis-button").on("click", () => {
            SDK.Storage.persist("courseId", 2)
            window.location.href = "adminDIS.html";
        });
        $("#itf-button").on("click", () => {
            SDK.Storage.persist("courseId", 3)
            window.location.href = "adminDIS.html";
        });
        $("#makro-button").on("click", () => {
            SDK.Storage.persist("courseId", 4)
            window.location.href = "adminDIS.html";
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
            "</thead>")

        $.each(quizzes, function (i, val) {
            var tr = '<tr>';
            tr += '<td>' + quizzes[i].quizTitle + '</td>';
            tr += '<td>' + quizzes[i].quizDescription + '</td>';
            tr += '<td>' + quizzes[i].createdBy + '</td>';
            tr += '<td>' + quizzes[i].questionCount + '</td>';
            tr += '</tr>';
            i + 1;
            $("#quizList").append(tr);
        });

        SDK.Storage.remove("courseId")
    });
});