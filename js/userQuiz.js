$(document).ready(() => {

    //SDK request for loading quizzes
    SDK.loadQuizzes((err, data)=>{
        if (err) throw err;
        var quizzes = JSON.parse(data);

        //Adding information to header cells in table
        $("#tablehead").append(`<thead>
            <th>Title</th>
            <th>Description</th>
            <th>Created By</th>
        </thead>`);

        //For each loop for adding quizzes to the table
        $.each(quizzes, (i, val) => {
            $("#quizList").append(`
            <tr><td width="20%">${quizzes[i].quizTitle}</td>
            <td width="40%">${quizzes[i].quizDescription}</td>
            <td width="30%">${quizzes[i].createdBy}</td>
            <td width="20%"><button class="quizBtn btn btn-primary pull-left"">Take this quiz!</button></td>`);
        });

        //Listener on quiz button from table
        $('.quizBtn').on('click', function () {
            /*Saving the quiz title that belongs to the selected quiz button. Link to where the code line is found:
            https://stackoverflow.com/questions/22993949/try-to-get-the-value-of-a-td-when-i-press-a-button*/
            var title = $(this).closest("tr").find("td:eq(0)").text();
            window.location.href = "userTakeQuiz.html";

            //For loop to go though all quizzes and find match between selected quiz and quiz title
            for (var i = 0; i < quizzes.length; i++) {
                if (title === quizzes[i].quizTitle) {
                    //SDK request for storing the selected quiz
                    SDK.Storage.persist("selectedQuiz", quizzes[i]);
                }
            }
        });
    });
});