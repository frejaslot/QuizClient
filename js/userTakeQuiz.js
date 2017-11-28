$(document).ready(() => {
    const currentUser = SDK.currentUser();
    const chosenQuiz = SDK.Storage.load("chosenQuiz");

    $(".page-header").html(`<h1>${chosenQuiz.quizTitle}</h1>`);
    $(".description").html(`<h4>${chosenQuiz.quizDescription}</h4>`);

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

    SDK.loadQuestions((err, data)=> {
        if (err) throw err;
        var questions = JSON.parse(data);

        i = 0;
        while (i < questions.length) {
            var question = questions[i].question;
            var questionId = questions[i].questionId;

            loadOptions(question);

            function loadOptions(question) {
                SDK.loadOptions(questionId, (err, data) => {
                    $(".table").append(`<p><b>${question}</b></p>`);

                    var options = JSON.parse(data);
                    var optionLength = options.length;

                    for (var k = 0; k < optionLength; k++) {
                        $(".table").append(`<p><input type="radio" name="option${questionId}" value="${options.isCorrect}">  ${options[k].option} </p>`);
                    }
                    console.log(questionId);
                });
                i++;
            }
            $("#returnBtn").on("click", () => {
                window.location.href = "userQuiz.html";
            });
            $("#saveAnswerBtn").on("click", () => {
                window.alert("Du har svaret rigtigt");
            });
        }
    });
});