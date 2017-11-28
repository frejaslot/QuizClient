$(document).ready(() => {
    const currentUser = SDK.currentUser();
    const chosenQuiz = SDK.Storage.load("chosenQuiz");

    $("#resultBtn").hide()

    $(".page-header").html(`<h1>${chosenQuiz.quizTitle}</h1>`);
    $(".description").html(`<h4>${chosenQuiz.quizDescription}</h4>`);

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

    SDK.loadQuestions((err, data) => {
        if (err) throw err;
        var questions = JSON.parse(data);

        questions.forEach((q) => {
            var question = q.question;
            var questionId = q.questionId;

            $(".table").append(`<div id="${questionId}"><p><b>${question}</b></p></div>`)

            SDK.loadOptions(questionId, (err, data) => {

                var options = JSON.parse(data);

                options.forEach((option) => {
                    $(`#${questionId}`).append(`<p><input type="radio" class="answer-radio" name="option${questionId}" value="${option.isCorrect}"> ${option.option} </p>`);
                });
            });
        });

        $("#returnBtn").on("click", () => {
            window.location.href = "userQuiz.html";
        });

        $("#saveAnswerBtn").on("click", () => {

            let correctAnswers = 0;

            $(".answer-radio").each(function () {
                if ($(this).is(":checked")) {
                    console.log($(this).val());
                    if($(this).val() == 1){
                        correctAnswers++;
                    }
                }
            });

            window.alert(correctAnswers);

            $("#resultBtn").show()
        });

        $("#resultBtn").on("click", () => {
            //modal der viser svarene
        });
    });
});