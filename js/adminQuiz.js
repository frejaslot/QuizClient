$(document).ready(() => {

    const chosenCourse = SDK.Storage.load("chosenCourse");
    const courseTitle = chosenCourse.courseTitle;
    $(".page-header").html(`<h1>${courseTitle}</h1>`);


    SDK.loadQuizzes((err, data) => {
        if (err) throw err;
        const quizzes = JSON.parse(data);
        console.log(quizzes);

        $("#tablehead").append(`<thead>
            <th>Title</th>
            <th>Description</th>
            <th>Created By</th>
            <th><button class=\"quizCreateBtn btn btn-success pull-left\">Create quiz</button></th>
        </thead>`);

        $.each(quizzes, (i, val) => {
            $("#quizList").append(`
            <tr><td width="20%">${quizzes[i].quizTitle}</td>
            <td width="40%">${quizzes[i].quizDescription}</td>
            <td width="30%">${quizzes[i].createdBy}</td>
            <td width="20%"><button class="quizDelBtn btn btn-danger pull-left">Delete quiz</button></td></tr>`);
        });

        $('.quizCreateBtn').on("click", () => {
            window.location.href = "adminCreateQ.html";
        });

        $('.quizDelBtn').on('click', function () {

            if (window.confirm("Do you want to delete this quiz?")) {
                var name = $(this).closest("tr").find("td:eq(0)").text();

                for (var i = 0; i < quizzes.length; i++) {
                    if (name === quizzes[i].quizTitle) {
                        SDK.Storage.persist("chosenQuiz", quizzes[i]);
                    }
                }
                SDK.deleteQuiz((err, data) => {});
                location.reload();
            }
        });
    });
});