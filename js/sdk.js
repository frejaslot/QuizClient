const SDK = {
    serverURL: "http://localhost:8080/api",

    request: (options, callback) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

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

    signup: (username, password, callback) => {
        SDK.request({
            data: {
                username: username,
                password: password
            },
            url: "/user/signup",
            method: "POST"
        }, (err, data) => {
            if (err) return callback(err);

            callback(null, data);
        });
    },


    encrypt: (encrypt) => {
        if (encrypt !== undefined && encrypt.length !== 0) {
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

    decrypt: (decrypt) => {
        if (decrypt !== undefined && decrypt.length !== 0) {
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