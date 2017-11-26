$(document).ready(() => {
    const currentUser = SDK.currentUser();

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

    SDK.loadCourses((err, data) => {
        if (err) throw err;
        const courses = JSON.parse(data);
        console.log(courses);

        $("#vos-button").on("click", () => {
            SDK.Storage.persist("chosenCourse", courses[3])
            window.location.href = "adminQuiz.html";
        });

        $("#dis-button").on("click", () => {
            SDK.Storage.persist("chosenCourse", courses[0])
            window.location.href = "adminQuiz.html";
        });

        $("#itf-button").on("click", () => {
            SDK.Storage.persist("chosenCourse", courses[1])
            window.location.href = "adminQuiz.html";
        });
        $("#makro-button").on("click", () => {
            SDK.Storage.persist("chosenCourse", courses[2])
            window.location.href = "adminQuiz.html";
        });
    });

    $("#return-button").on("click", () => {
        window.location.href = "adminQuiz.html";
    });

    $("#createQ-button").on("click", () => {
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
                    var i = 1;
                    $(".modal-title").html(`<h1>Question ${i}</h1>`);
                    var createdQuiz = JSON.parse(data);
                    const quizId = createdQuiz.quizId;

                    $("#addQuestion-button").click(() => {
                        const createdQuestion = $("#question").val();


                        SDK.createQuestion(createdQuestion, quizId, (err, data) => {
                            if (err && err.xhr.status == 400) {
                                $(".form-group").addClass("Client fail");
                            }
                            else if (err) {
                                console.log("Error")
                            } else {
                                console.log(data);
                                $("#question").val("");

                                $(".modal-title").html(`<h1>Question ${++i}</h1>`);
                                $(".question-added").html(`<h4 id="text">Question added</h4>`);

                                const newQuestion = JSON.parse(data);
                                const optionToQuestionId = newQuestion.questionId;
                                console.log(optionToQuestionId);
                                //Måske er det ovenstående den er gal med Andy???
                                const correct = $("#correct").val();
                                const wrong1 = $("#wrong1").val();
                                const wrong2 = $("#wrong2").val();
                                const wrong3 = $("#wrong3").val();

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

                                        SDK.createOption(wrong1, optionToQuestionId, isCorrect, (err, data) => {
                                            if (err && err.xhr.status == 400) {
                                                $(".form-group").addClass("Client fail");
                                            }
                                            else if (err) {
                                                console.log("Error")
                                            } else {
                                                $("#wrong1").val("");

                                                SDK.createOption(wrong2, optionToQuestionId, isCorrect, (err, data) => {
                                                    if (err && err.xhr.status == 400) {
                                                        $(".form-group").addClass("Client fail");
                                                    }
                                                    else if (err) {
                                                        console.log("Error")
                                                    } else {
                                                        $("#wrong2").val("");

                                                        SDK.createOption(wrong3, optionToQuestionId, isCorrect, (err, data) => {
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
                        });


                    });
                    $("#saveQuiz-button").click(() => {

                        if (window.confirm("Is this quiz done?")) {
                            window.location.href = "adminQuiz.html"
                        }
                    });
                }
            });
        }
    });
});
