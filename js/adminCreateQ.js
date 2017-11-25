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

                    $("#addQuestionButton").click(() => {
                        const createdQuestion = $("#question").val();
                        const questionId = createdQuestion.questionId;
                        
                        SDK.createQuestion(createdQuestion, quizId, (err, data) => {
                            if (err && err.xhr.status == 400) {
                                $(".form-group").addClass("Client fail");
                            }
                            else if (err) {
                                console.log("Error")
                            } else {
                                $("#question").val("");

                                $(".modal-title").html(`<h1>Question ${++i}</h1>`);
                                $(".question-added").html(`<h4 id="text">Question added</h4>`);

                                const newQuestion = JSON.parse(data);
                                const correct = $("#correct").val();
                                const wrong1 = $("#wrong1").val();
                                const wrong2 = $("#wrong2").val();
                                const wrong3 = $("#wrong3").val();

                                var isCorrect = 1;

                                SDK.createOption(correct, questionId, isCorrect, (err, data) => {
                                    if (err && err.xhr.status == 400) {
                                        $(".form-group").addClass("Client fail");
                                    }
                                    else if (err) {
                                        console.log("Error")
                                    } else {
                                        $("#correct").val("")

                                        SDK.createOption(wrong1, questionId, isCorrect, (err, data) => {
                                            if (err && err.xhr.status == 400) {
                                                $(".form-group").addClass("Client fail");
                                            }
                                            else if (err) {
                                                console.log("Error")
                                            } else {
                                                $("#wrong1").val("");

                                                SDK.createOption(wrong2, questionId, isCorrect, (err, data) => {
                                                    if (err && err.xhr.status == 400) {
                                                        $(".form-group").addClass("Client fail");
                                                    }
                                                    else if (err) {
                                                        console.log("Error")
                                                    } else {
                                                        $("#wrong2").val("");

                                                        SDK.createOption(wrong3, questionId, isCorrect, (err, data) => {
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
                    $("#saveChangesButton").click(() => {
                        window.location.href = "courseview.html"


                    });
                }
            });
        }
    });

});
