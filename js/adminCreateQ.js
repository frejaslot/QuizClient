$(document).ready(() => {

    $("#returnBtn").on("click", () => {
        window.location.href = "adminQuiz.html";
    });

    $("#createQuizBtn").on("click", () => {
        const createdBy = $("#quizAuthor").val();
        const quizTitle = $("#quizTitle").val();
        const quizDescription = $("#quizDescription").val();
        const chosenCourse = SDK.Storage.load("chosenCourse");
        const courseId = chosenCourse.courseId;
        const questionCount = 5;

        if(!quizTitle || !quizDescription || !createdBy) {
            alert("Information is missing. Please try again");
        } else {
            SDK.createQuiz(createdBy, quizTitle, quizDescription, courseId, questionCount, (err, data) => {
                if (err && err.xhr.status == 400) {
                    $(".form-group").addClass("Client fail");
                }
                else if (err) {
                    console.log("Error")
                } else {
                    $("#quizTitle").val('');
                    $("#quizDescription").val('');
                    $("#quizAuthor").val('');


                    $('#questionModal').modal('show');
                    var createdQuiz = JSON.parse(data);
                    const quizId = createdQuiz.quizId;

                    var i = 1;
                    $(".modal-title").html(`<h1>${i}. Question</h1>`);


                    $("#addQuestionBtn").click(() => {
                        const createdQuestion = $("#question").val();

                        if(!createdQuestion) {
                            alert("Information is missing. Please try again");
                        }else {
                            SDK.createQuestion(createdQuestion, quizId, (err, data) => {
                                if (err && err.xhr.status == 400) {
                                    $(".form-group").addClass("Client fail");
                                }
                                else if (err) {
                                    console.log("Error")
                                } else {
                                    $("#question").val("");

                                    const newQuestion = JSON.parse(data);
                                    const optionToQuestionId = newQuestion.questionId;
                                    const correct = $("#correct").val();
                                    const wrong1 = $("#wrong1").val();
                                    const wrong2 = $("#wrong2").val();
                                    const wrong3 = $("#wrong3").val();

                                    if (!correct || !wrong1 || !wrong2 || !wrong3) {
                                        alert("Information is missing. Please try again");
                                    } else {

                                        $(".modal-title").html(`<h1>${++i}. question</h1>`);

                                        var isCorrect = 1;
                                        SDK.createOption(correct, optionToQuestionId, isCorrect, (err, data) => {
                                            console.log(data);
                                            if (err && err.xhr.status == 400) {
                                                $(".form-group").addClass("Client fail");
                                            }
                                            else if (err) {
                                                console.log("Error")
                                            } else {
                                                $("#correct").val("")

                                                SDK.createOption(wrong1, optionToQuestionId, isCorrect = 0, (err, data) => {
                                                    if (err && err.xhr.status == 400) {
                                                        $(".form-group").addClass("Client fail");
                                                    }
                                                    else if (err) {
                                                        console.log("Error")
                                                    } else {
                                                        $("#wrong1").val("");

                                                        SDK.createOption(wrong2, optionToQuestionId, isCorrect = 0, (err, data) => {
                                                            if (err && err.xhr.status == 400) {
                                                                $(".form-group").addClass("Client fail");
                                                            }
                                                            else if (err) {
                                                                console.log("Error")
                                                            } else {
                                                                $("#wrong2").val("");

                                                                SDK.createOption(wrong3, optionToQuestionId, isCorrect = 0, (err, data) => {
                                                                    if (err && err.xhr.status == 400) {
                                                                        $(".form-group").addClass("Client fail");
                                                                    }
                                                                    else if (err) {
                                                                        console.log("Error")
                                                                    } else {
                                                                        $("#wrong3").val("");
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                    $("#saveQuizBtn").click(() => {
                        if (window.confirm("Is this quiz done?")) {
                            window.location.href = "adminQuiz.html"
                        }
                    });
                }
            });
        }
    });
});
