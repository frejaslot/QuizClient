$(document).ready(() => {

    //SDK request for loading selected course from local storage
    const selectedCourse = SDK.Storage.load("selectedCourse");
    const courseTitle = selectedCourse.courseTitle;
    $(".page-header").html(`<h1>${courseTitle}</h1>`);

    //SDK request for loading all quizzes
    SDK.loadQuizzes((err, data) => {
        if (err) throw err;
        const quizzes = JSON.parse(data);

        //Adding information and a create button to header cells in table
        $("#tablehead").append(`<thead>
            <th>Title</th>
            <th>Description</th>
            <th>Created By</th>
            <th><button class=\"quizCreateBtn btn btn-success pull-left\">Create quiz</button></th>
        </thead>`);

        //For each loop for adding quizzes to the table
        $.each(quizzes, (i, val) => {
            $("#quizList").append(`
            <tr><td width="20%">${quizzes[i].quizTitle}</td>
            <td width="40%">${quizzes[i].quizDescription}</td>
            <td width="30%">${quizzes[i].createdBy}</td>
            <td width="20%"><button class="quizDelBtn btn btn-danger pull-left">Delete quiz</button></td></tr>`);
        });

        //Listener on create quiz button
        $('.quizCreateBtn').on("click", () => {
            window.location.href = "adminCreateQ.html";
        });

        //Listener on delete quiz button
        $('.quizDelBtn').on('click', function () {

            //window to confirm deleting selected quiz
            if (window.confirm("Do you want to delete this quiz?")) {
                /*Saving the quiz title that belongs to the selected delete quiz button. Link to where the code line
                is found: https://stackoverflow.com/questions/22993949/try-to-get-the-value-of-a-td-when-i-press-a-button*/
                var title = $(this).closest("tr").find("td:eq(0)").text();

                //For loop to go though all quizzes and find match between selected quiz and quiz title
                for (var i = 0; i < quizzes.length; i++) {
                    if (title === quizzes[i].quizTitle) {
                        //SDK request for storing the selected quiz
                        SDK.Storage.persist("selectedQuiz", quizzes[i]);
                    }
                }
                //SDK request for deleting the selected quiz
                SDK.deleteQuiz((err, data) => {});
                location.reload();
            }
        });
    });
});