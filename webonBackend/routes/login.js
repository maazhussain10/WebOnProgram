const md5 = require("md5");
const { userExists } = require("../files/SQL-user");

class LoggingIn {
    constructor(app, connection) {
        this.loggingIn(app, connection);
    }

    loggingIn(app, connection) {
        app.post("/loggingIn", (req, res) => {
            let username = req.query.username;
            let password = md5(req.query.password);

            async function checkExistence() {
                let userData = await userExists(username);
                let responseData = {};
                if (password === userData.password) {
                    responseData = {
                        responseMessage: "Successfull login",
                        responseStatus: true,
                        username: userData.username,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                    };
                } else {
                    responseData = {
                        responseMessage: "Login failure",
                        responseStatus: false,
                    };
                }
                res.send(responseData);
            }
            checkExistence();
        });
    }
}
module.exports = LoggingIn;
