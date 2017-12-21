$(document).ready(() => {

    //Listener on return button
    $("#returnBtn").on("click", () => {
        window.location.href = "adminQuiz.html";
    });

    //Listener on create quiz button
    $("#createQuizBtn").on("click", () => {
        //Saving quiz inputs as const
        const createdBy = $("#quizAuthor").val();
        const quizTitle = $("#quizTitle").val();
        const quizDescription = $("#quizDescription").val();
        const selectedCourse = SDK.Storage.load("selectedCourse");
        const courseId = selectedCourse.courseId;
        const questionCount = 0;

        //Verify that all inputs has been typed
        if(!quizTitle || !quizDescription || !createdBy) {
            alert("Information is missing. Please try again");
        } else {
            //SDK request for creating a quiz
            SDK.createQuiz(createdBy, quizTitle, quizDescription, courseId, questionCount, (err, data) => {
                if (err && err.xhr.status == 400) {
                    console.log("Failed creating quiz");
                    window.alert("An error has occurred. Please try again");
                } else if (err) {
                    window.alert("An error has occurred. Please try again");
                } else {
                    //Modal for creating questions. The modal is inspired from this link:
                    // https://github.com/andytranski/QuizClient/blob/master/js/newQuizHandler.js
                    $('#questionModal').modal('show');
                    $("#saveBtn").hide();

                    //Saving the quiz id of the quiz as const
                    var createdQuiz = JSON.parse(data);
                    const quizId = createdQuiz.quizId;

                    //Modal title
                    var i = 1;
                    $(".modal-title").html(`<h1>${i}. Question</h1>`);

                    //Listener on add question button
                    $("#addQuestionBtn").on("click", () => {
                        //Saving question and option inputs as const
                        const createdQuestion = $("#question").val();
                        const correct = $("#correct").val();
                        const wrong1 = $("#wrong1").val();
                        const wrong2 = $("#wrong2").val();
                        const wrong3 = $("#wrong3").val();

                        //Verifying that all the inputs has been typed
                        if(!createdQuestion || !correct || !wrong1 || !wrong2 || !wrong3) {
                            alert("Information was missing. Please try again");
                            //Clearing all the text boxes
                            $("#question").val("");
                            $("#correct").val("");
                            $("#wrong1").val("");
                            $("#wrong2").val("");
                            $("#wrong3").val("");
                        }else {
                            //SDK request for creating a question
                            SDK.createQuestion(createdQuestion, quizId, (err, data) => {
                                if (err && err.xhr.status == 400) {
                                    window.alert("An error has occurred. Please try again");
                                    console.log("failed creating question");
                                } else if (err) {
                                    window.alert("An error has occurred. Please try again");
                                } else {
                                    $("#saveBtn").show();
                                    //Clearing the question text box
                                    $("#question").val("");

                                    //Saving question id as const
                                    const newQuestion = JSON.parse(data);
                                    const optionToQuestionId = newQuestion.questionId;

                                    $(".modal-title").html(`<h1>${++i}. question</h1>`);

                                    //SDK request for creating the correct option
                                    var isCorrect = 1;
                                    SDK.createOption(correct, optionToQuestionId, isCorrect, (err, data) => {
                                        if (err && err.xhr.status == 400) {
                                            window.alert("An error has occurred. Please try again");
                                            console.log("failed creating question");
                                        } else if (err) {
                                            window.alert("An error has occurred. Please try again");
                                        } else {
                                            $("#correct").val("")
                                        }
                                    });

                                    //SDK request for creating option
                                    SDK.createOption(wrong1, optionToQuestionId, isCorrect = 0, (err, data) => {
                                        if (err && err.xhr.status == 400) {
                                            window.alert("An error has occurred. Please try again");
                                            console.log("failed creating question");
                                        } else if (err) {
                                            window.alert("An error has occurred. Please try again");
                                        } else {
                                            $("#wrong1").val("");
                                        }
                                    });

                                    //SDK request for creating option
                                    SDK.createOption(wrong2, optionToQuestionId, isCorrect = 0, (err, data) => {
                                        if (err && err.xhr.status == 400) {
                                            window.alert("An error has occurred. Please try again");
                                            console.log("failed creating question");
                                        } else if (err) {
                                            window.alert("An error has occurred. Please try again");
                                        } else {
                                            $("#wrong2").val("");
                                        }
                                    });

                                    //SDK request for creating option
                                    SDK.createOption(wrong3, optionToQuestionId, isCorrect = 0, (err, data) => {
                                        if (err && err.xhr.status == 400) {
                                            window.alert("An error has occurred. Please try again");
                                            console.log("failed creating question");
                                        } else if (err) {
                                            window.alert("An error has occurred. Please try again");
                                        } else {
                                            $("#wrong3").val("");
                                        }
                                    });
                                }
                            });
                        }
                    });
                    //Listener on save quiz button
                    $("#saveBtn").on("click", () => {
                        //window to confirm saving the quiz
                        if (window.confirm("Is this quiz done?")) {
                            window.location.href = "adminQuiz.html"
                        }
                    });
                }
            });
        }
    });
});
