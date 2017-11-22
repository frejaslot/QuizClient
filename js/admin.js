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
                SDK.Storage.remove("courseId")
            }
        });
    });

    SDK.loadCourses((err, data) => {
        if (err) throw err;
        const courses = JSON.parse(data);
        console.log(courses);

        $("#vos-button").on("click", () => {
            SDK.currentCourse();
        });

        $("#dis-button").on("click", () => {
            //ARRAY MED ID OG TITLE!!!!
            window.location.href = "adminDIS.html";
        });

        $("#itf-button").on("click", () => {
            SDK.Storage.persist("courseId", 3)
            window.location.href = "adminDIS.html";
        });
        $("#makro-button").on("click", () => {
            SDK.Storage.persist("courseId", 4)
            window.location.href = "adminDIS.html";
        });
    });

    SDK.loadCourses((err, data)=>{
        const courses = JSON.parse(data);
        console.log(courses);

        $.each(courses, (i, val) => {
            var tr = '<tr>';
            tr += '<td> <button class="courseBtn" data-key="' + (i+1) + '">'+courses[i].courseTitle + '</button></td>';
            $("#courseList").append(tr);
        });

        $('button.courseBtn').on('click', function () {
            var name = $(this).closest("tr").find("td:eq(0)").text();
            window.location.href = "admin.html";

            for (var i = 0; i < course.length; i++) {
                if (name === course[i].courseTitle) {
                    SDK.Storage.persist("chosenCourse", course[i])
                }
            }

        });
    });

});
