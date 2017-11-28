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

            let Answers = 0;
            let correctAnswers = 0;

            $(".answer-radio").each(function () {
                if ($(this).is(":checked")) {
                    Answers++;
                    if ($(this).val() == 1) {
                        correctAnswers++;
                    }
                }
            });

            $('#submitModal').modal('show');
                $("#result").append(`<p>You got <b>${correctAnswers}</b> out of <b>${Answers}</b> questions right.</p><p> You can now click on 'Show results' to see the right answers</p>`);

                $("#closeBtn").on("click", () => {
                    $("#result").html("");
                    $('#submitModal').modal('hide');
                });

                $("#resultBtn").show()
            });
        });

        $("#resultBtn").on("click", () => {
            $('#answerModal').modal('show');
            $("#rightAnswers").append(`<div id="${questions.questionId}"><p><b>${questions.question}</b></p></div>`)

        });
    });