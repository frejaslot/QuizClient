$(document).ready(() => {
    const currentUser = SDK.currentUser();

    $("#logOutBtn").on("click", () => {

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
        var quizzes = JSON.parse(data);

        $("#tablehead").append(`<thead>
            <th>Title</th>
            <th>Description</th>
            <th>Created By</th>
        </thead>`);

        $.each(quizzes, (i, val) => {
            $("#quizList").append(`
            <tr><td width="20%">${quizzes[i].quizTitle}</td>
            <td width="40%">${quizzes[i].quizDescription}</td>
            <td width="30%">${quizzes[i].createdBy}</td>
            <td width="20%"><button class="quizBtn btn btn-primary pull-left"">Take this quiz!</button></td>`);
        });

        $('.quizBtn').on('click', function () {
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