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
                SDK.Storage.remove("chosenCourse")
                SDK.Storage.remove("chosenQuiz")
            }
        });
    });

    $(".header").html(`<h1 align="center">${quiz.quizTitle}</h1>`);
    $(".header").html(`<h2 align="center">${quiz.quizDescription}</h2>`);

    i = 0;
    SDK.loadQuestions((err, data)=> {
        var $table = $(".table");
        if (err) throw err;
        var questions = JSON.parse(data);

        while (i < questions.length) {
            var question = (questions[i].question);

            loadOptions(question);

            function loadOptions(question) {

                SDK.loadOptions(questions[i].questionId, (err, data) => {
                    $(".table").append(`<p><b>${question}</b></p>`);

                    var options = JSON.parse(data);
                    var optionLength = options.length;

                    for (var k = 0; k < optionLength; k++) {
                        $(".table").append(`<p><input type="radio" name="option${question.questionId}"<br>  ${options[k].option} </p>`);
                    }
                });
                i++;
            }
        }
    });
});