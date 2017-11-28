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

    SDK.loadQuizzes((err, data)=>{
        if (err) throw err;

        $("#tablehead").append("<thead>\n" +
            "            <th>Title</th>\n" +
            "            <th>Description</th>\n" +
            "            <th>Created By</th>\n" +
            "            </thead>");

        var quizzes = JSON.parse(data);

        $.each(quizzes, (i, val) => {
            var tr = '<tr>';
            tr += '<td width="25%">' + quizzes[i].quizTitle + '</td>';
            tr += '<td width="40%">' + quizzes[i].quizDescription + '</td>';
            tr += '<td width="20%">' + quizzes[i].createdBy + '</td>';
            tr += '<td width="15%"><button class="quizBtn btn btn-primary pull-left" data-key="' + (i+1) + '">Take this quiz!</button></td>';
            tr += '</tr>';
            $("#quizList").append(tr);
        });

        $('button.quizBtn').on('click', function () {
            var name = $(this).closest("tr").find("td:eq(0)").text();
            window.location.href = "userTakeQuiz.html";

            for (var i = 0; i < quizzes.length; i++) {
                if (name === quizzes[i].quizTitle) {
                    SDK.Storage.persist("chosenQuiz", quizzes[i]);
                }
            }
        });
    });
});