$(document).ready(() => {
    const currentUser = SDK.currentUser();
    const quiz = SDK.Storage.load("chosenQuiz");

    $(".page-header").html(`<h1>${quiz.quizTitle}</h1>`);

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

    SDK.loadQuestions((err, data)=>{
        if (err) throw err;
        var questions = JSON.parse(data);

        console.log(questions);

        $.each(questions, (i, val) => {
            var tr = '<tr>';
            tr += '<td>' + questions[i].question + '</td>';
            tr += '</tr>';
            $("#questionList").append(tr);
        });

    });


});