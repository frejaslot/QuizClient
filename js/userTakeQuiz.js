$(document).ready(() => {

    $("#resultBtn").hide()

    //SDK request for loading selected quiz from local storage
    const selectedQuiz = SDK.Storage.load("selectedQuiz");
    $(".page-header").html(`<h1>${selectedQuiz.quizTitle}</h1>`);
    $(".description").html(`<h4>${selectedQuiz.quizDescription}</h4>`);

    //SDK request for loading all questions
    SDK.loadQuestions((err, data) => {
        if (err) throw err;
        var questions = JSON.parse(data);

        //For each loop for adding all the questions to the table
        questions.forEach((q) => {
            var question = q.question;
            var questionId = q.questionId;
            $(".table").append(`<div id="${questionId}"><p><b>${question}</b></p></div>`)

            //SDK request for loading all the options
            SDK.loadOptions(questionId, (err, data) => {
                if (err) throw err;
                var options = JSON.parse(data);

                //Function to mix options for a random order
                options = shuffle(options);

                //For each loop for adding options to the specific question (with radio buttons)
                options.forEach((option) => {
                    $(`#${questionId}`).append(`<p><input type="radio" class="answer-radio" name="option${questionId}" value="${option.isCorrect}"> ${option.option} </p>`);
                });
            });
        });

        //Listener on return button
        $("#returnBtn").on("click", () => {
            window.location.href = "userQuiz.html";
        });

        //Listener on save answer button
        $("#saveAnswerBtn").on("click", () => {
            let totalQuestions = 0;
            let correctAnswers = 0;

            //Function to count number of questions answered
            $(".answer-radio").each(function () {
                if ($(this).is(":checked")) {
                    totalQuestions++;
                    //Function to count number of correct answers
                    if ($(this).val() == 1) {
                        correctAnswers++;
                    }
                }
            });

            //Saving percentage of correct answers as const
            const quizWidth = correctAnswers/totalQuestions*100;

            //Modal that shows score, and makes result button appear
            $('#submitModal').modal('show');
                //Modal message with progress bar and score from quiz
                $("#result").append(`
                    <div><div class="progress">
                    <div class="progress-bar progress-bar-info progress-bar-striped" style="width:${quizWidth}%"></div></div>
                    <p>You got <b>${correctAnswers}</b> out of <b>${totalQuestions}</b> questions correct.</p>
                    <p> You can now click on 'Show results' to see the correct answers on all questions.</p>`);

                //Listener on close button
                $("#closeBtn").on("click", () => {
                    //Clearing the html of submit modal
                    $("#result").html("");
                    $('#submitModal').modal('hide');
                });

                $("#resultBtn").show()
            });

        //Listener on result button
        $("#resultBtn").on("click", () => {
            //Result modal appears
            $('#resultModal').modal('show');

            //For each loop for adding all the questions to modal
            questions.forEach((q) => {
                $('#resultDIV').append(`<div id=res${q.questionId}><p><b>${q.question}</b></p></div>`);

                //SDK request for adding the correct answer underneath question
                SDK.loadOptions(q.questionId, (err, data) => {
                    if (err) throw err;
                    var options = JSON.parse(data);

                    //For loop for finding and printing the correct answers
                    for(let i = 0; i < options.length; i++) {
                        if(options[i].isCorrect==1) {
                            $(`#res${q.questionId}`).append(`<p>Correct answer: ${options[i].option} </p>`);
                        }
                    }
                });
            });

            //Listener on close button
            $("#closeResBtn").on("click", () => {
                //Clearing the html of result modal
                $("#resultDIV").html("");
                $('#resultModal').modal('hide');
            });
        });

    });

    /*Function to mixing options. Is found on this link:
    https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
});