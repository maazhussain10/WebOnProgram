const md5 = require("md5");
const { addAccount, transaction, transactionDetails } = require("../files/SQL-user");

class Account {
    constructor(app, connection) {
        this.account(app, connection);
        this.transaction(app, connection);
        this.getTransaction(app, connection);
    }

    account(app, connection) {
        app.post("/addAccount", (req, res) => {
            let {username, accountName, INRValue} = req.query;
            addAccount(username, accountName, INRValue);
            res.send("Success");
        });
    }
    
    transaction(app, connection) {
        app.post("/transaction", (req, res) => {
            let {username,selectedCrypto,cryptoValue} = req.query;
            console.log(cryptoValue, selectedCrypto, username);
            transaction(username,selectedCrypto,cryptoValue);
            res.send("Success");
        });
    }
    
    getTransaction(app, connection) {
        app.get("/getTransactions", async (req, res) => {
            let {username} = req.query;
            let transactionDetail = await transactionDetails(username);
            res.send(transactionDetail);
        });
    }
}
module.exports = Account;
