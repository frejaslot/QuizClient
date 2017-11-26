$(document).ready(() => {

    const chosenCourse = SDK.Storage.load("chosenCourse");
    const courseTitle = chosenCourse.courseTitle;
    $(".page-header").html(`<h1>${courseTitle}</h1>`);


    SDK.loadQuizzes((err, data) => {
        if (err) throw err;
        const quizzes = JSON.parse(data);
        console.log(quizzes);

        $("#tablehead").append("<thead>\n" +
            "<th>Title</th>\n" +
            "<th>Description</th>\n" +
            "<th>Created By</th>\n" +
            "<th><button class=\"quizCreateBtn btn btn-success pull-left\">Create quiz</button></th>\n" +
            "</thead>")

        $.each(quizzes, function (i, val) {
            var tr = '<tr>';
            tr += '<td>' + quizzes[i].quizTitle + '</td>';
            tr += '<td>' + quizzes[i].quizDescription + '</td>';
            tr += '<td>' + quizzes[i].createdBy + '</td>';
            tr += '<td><button class="quizDelBtn btn btn-danger pull-left" data-key="' + (i+1) + '">Delete quiz</button></td>';
            tr += '</tr>';
            i + 1;
            $("#quizList").append(tr);
        });

        $('button.quizCreateBtn').on('click', function () {
            window.location.href = "adminCreateQ.html";
        });

        $('button.quizDelBtn').on('click', function () {

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