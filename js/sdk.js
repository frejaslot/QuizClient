const SDK = {
    //URL for the server
    serverURL: "http://localhost:8080/api",

    //SDK request
    request: (options, callback) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        //Asynchronous call to server
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(SDK.encrypt(JSON.stringify(options.data))),
            success: (data, status, xhr) => {
                callback(null, SDK.decrypt(data), status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                callback({xhr: xhr, status: status, error: errorThrown});
            }
        });
    },

    //Request for signing up
    signUp: (username, password, callback) => {
        SDK.request({
            data: {
                username: username,
                password: password
            },
            method: "POST",
            url: "/user/signup"
        }, (err, data) => {
            if (err) return callback(err);
            callback(null, data);
        });
    },

    //Request for logging in
    logIn: (username, password, callback) => {
        SDK.request({
            data: {
                username: username,
                password: password
            },
            method: "POST",
            url: "/user/login"
        }, (err, data) => {
            if (err) return callback(err);
            //Storing the token used for requests in headers
            SDK.Storage.persist("myToken", data);
            callback(null, data);
        });
    },

    //Request for loading the current user
    loadCurrentUser: (callback) => {
        SDK.request({
            method: "GET",
            url: "/user/myuser",
            //Header for authorization in server
            headers: {
                //Header for authorization in server
                authorization: SDK.Storage.load("myToken"),
            },
        }, (err, user) => {
            if (err) return callback(err);
                //Storing the current user in local storage
                SDK.Storage.persist("myUser", user);
            callback(null, user);
        });
    },

    //Returning current user
    currentUser: () => {
        const loadedUser = SDK.Storage.load("myUser");
        return loadedUser.currentUser;
    },

    //Request for logging out
    logOut: (userId, callback) => {
        SDK.request({
            method: "POST",
            url: "/user/logout",
            data: userId,
        }, (err, data) => {
            if(err) return callback(err);
            callback(null, data);
        });
    },

    //Request for loading all courses
    loadCourses: (callback) => {
        SDK.request({
            method: "GET",
            url: "/course",
            headers: {
                //Header for authorization in server
                authorization: SDK.Storage.load("myToken"),
            },
        }, (err, data) => {
            if (err) return callback(err);
            callback(null, data);
        });
    },

    //Request for loading all quizzes within specific course
    loadQuizzes: (callback) => {
        //Loading the selected course's id from local storage
        const selectedCourse = SDK.Storage.load("selectedCourse");
        const courseId = selectedCourse.courseId;

        SDK.request({
            method: "GET",
            url: "/quiz/" + courseId,
            headers: {
                //Header for authorization in server
                authorization: SDK.Storage.load("myToken"),
            },
        }, (err, data) => {
            if (err) return callback(err);
            callback(null, data);
        });
    },

    //Request for deleting quiz
    deleteQuiz: (callback) => {
        //Loading the selected course's id from local storage
        const selectedQuiz = SDK.Storage.load("selectedQuiz")
        const quizId = selectedQuiz.quizId;

        SDK.request({
            method: "DELETE",
            url: "/quiz/" + quizId,
            headers: {
                //Header for authorization in server
                authorization: SDK.Storage.load("myToken")
            },
        }, (err, data) => {
            if (err) return callback(err);
            callback(null, data)
        });
    },

    //Request for creating a quiz
    createQuiz: (createdBy, quizTitle, quizDescription, courseId, questionCount, callback) => {
        SDK.request({
            data: {
                createdBy: createdBy,
                quizTitle: quizTitle,
                quizDescription: quizDescription,
                courseId: courseId,
                questionCount: questionCount
            },
            method: "POST",
            url: "/quiz/",
            headers: {
                //Header for authorization in server
                authorization: SDK.Storage.load("myToken"),
            },
        }, (err, data) => {
            if (err) return callback(err);
            callback(null, data);
        });
    },

    //Request for loading questions for specific quiz
    loadQuestions: (callback) =>{
        //Loading the selected quiz's id from local storage
        const selectedQuiz = SDK.Storage.load("selectedQuiz");
        const quizId = selectedQuiz.quizId;

        SDK.request({
            method: "GET",
            url: "/question/" + quizId,
            headers: {
                //Header for authorization in server
                authorization: SDK.Storage.load("myToken"),
            },
        }, (err, data) => {
            if (err) return callback(err);
            callback(null, data);
        });
    },

    //Request for creating questions
    createQuestion: (question, quizId, callback) => {
        SDK.request({
            data: {
                question: question,
                questionToQuizId: quizId
            },
            method: "POST",
            url: "/question",
            headers: {
                //Header for authorization in server
                authorization: SDK.Storage.load("myToken"),
            }
        }, (err, data) => {
            if (err) return callback(err);
            callback(null, data);
        })
    },

    //Request for loading options for specific question
    loadOptions: (questionId, cb) => {
        SDK.request({
            method: "GET",
            url: "/option/" + questionId,
            headers: {
                //Header for authorization in server
                authorization: SDK.Storage.load("myToken")
            },
        }, (err, options) => {
            if (err) return cb(err);
            cb(null, options)
        });
    },

    //Request for creating an option
    createOption: (option, optionToQuestionId, isCorrect, callback) => {
        SDK.request({
            data: {
                option: option,
                optionToQuestionId: optionToQuestionId,
                isCorrect: isCorrect
            },
            method: "POST",
            url: "/option",
            headers: {
                //Header for authorization in server
                authorization: SDK.Storage.load("myToken"),
            }
        }, (err, data) => {
            if (err) return callback(err);
            callback(null, data);
        })
    },

    //Local storage functions
    Storage: {
        prefix: "DøkQuizSDK",
        //Function for storing element in local storage
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        //Function for loading element from local storage
        load: (key) => {
            const val = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        //Function for deleting element in local storage
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        }
    },

    //Method for encrypting data to the server
    encrypt: (encrypt) => {
        if (encrypt !== undefined && encrypt.length !== 0) {
            //Encrypt key
            const key = ['L', 'Y', 'N'];
            let isEncrypted = "";
            for (let i = 0; i < encrypt.length; i++) {
                isEncrypted += (String.fromCharCode((encrypt.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0)))
            }
            return isEncrypted;
        } else {
            return encrypt;
        }
    },

    //Method for decrypting data from the server
    decrypt: (decrypt) => {
        if (decrypt !== undefined && decrypt.length !== 0) {
            //Encrypt key
            const key = ['L', 'Y', 'N'];
            let isDecrypted = "";
            for (let i = 0; i < decrypt.length; i++) {
                isDecrypted += (String.fromCharCode((decrypt.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0)))
            }
            return isDecrypted;
        } else {
            return decrypt;
        }
    },
};