$(document).ready(() => {

    //SDK request for loading all courses
    SDK.loadCourses((err, data)=>{
        if (err) throw err;
        const courses = JSON.parse(data);

        //For each loop for adding course buttons to table
        $.each(courses, (i, val) => {
            $("#courseList").append(`
           <tr><td><button class="courseBtn btn btn-lg btn-default btn-block">${courses[i].courseTitle}</button></td>`);
        });

        //Listener on course button from table
        $('.courseBtn').on("click", function () {
            //Saving the course title of the selected button
            var title = $(this).text();
            window.location.href = "userQuiz.html";

            //For loop to go though all courses
            for (var i = 0; i < courses.length; i++) {
                //Verify that title of selected button and course title match
                if (title === courses[i].courseTitle) {
                    //SDK request for storing the selected course
                    SDK.Storage.persist("selectedCourse", courses[i])
                }
            }
        });
    });
});