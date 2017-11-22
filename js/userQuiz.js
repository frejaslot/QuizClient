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

        const course = SDK.Storage.load("chosenCourse")
        var quizzes = JSON.parse(data);

        $.each(quizzes, (i, val) => {
            var tr = '<tr>';
            tr += '<td>' + quizzes[i].quizTitle + '</td>';
            tr += '<td>' + quizzes[i].quizDescription + '</td>';
            tr += '<td>' + quizzes[i].createdBy + '</td>';
            tr += '<td><button class="quizBtn btn btn-primary pull-left" data-key="' + (i+1) + '">Take this quiz!</button></td>';
            tr += '</tr>';
            $("#quizList").append(tr);
            });

            $('button.quizBtn').on('click', function () {
                var name = $(this).closest("tr").find("td:eq(1)").text();

                for (var i = 0; i < quiz.length; i++) {
                    if (name === quiz[i].quizTitle) {
                        SDK.Storage.persist("chosenQuiz", quiz[i]);

                        window.location.href = "startquiz.html";

                    }
                }
            });




    });
});