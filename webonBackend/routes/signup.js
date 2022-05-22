const md5 = require("md5");
const { createUser } = require("../files/SQL-user");

class SigningUp {
    constructor(app, connection) {
        this.signingUp(app, connection);
    }

    signingUp(app, connection) {
        app.post("/signingUp", (req, res) => {
            const { firstName, lastName, username } = req.query;
            const password = md5(req.query.password);

            createUser(firstName, lastName, username, password);
            res.send("Success");
        });
    }
}

module.exports = SigningUp;
