const { connection } = require("./connection");
const uuid = require("uuid-random");

exports.createUser = (firstName, lastName, email, password) => {
    let sql = `Insert into users values(?, ?, ?, ?, ?);`;
    connection.query(
        sql,
        [uuid(), firstName, lastName, email, password],
        (err, results) => {
            if (err) return console.log(err);
            else {
                console.log("User has been created");
            }
        }
    );
};

exports.userExists = async (username) => {
    console.log(username);
    let sql = "Select * from users where username=?;";
    return new Promise((resolve, reject) => {
        connection.query(sql, [username], (err, results) => {
            if (err) console.log(err);
            else if (results.length != 0) {
                console.log(results);
                let responseData = {
                    firstName: results[0].firstName,
                    lastName: results[0].lastName,
                    username: results[0].username,
                    password: results[0].password,
                };
                resolve(responseData);
            } else resolve(false);
        });
    });
};


exports.addAccount = async(username, accountName, INRValue) =>{
    let sql = "Insert into userAccount values(?,?,?,?);";
    return new Promise((resolve, reject) => {
        connection.query(sql, [username, uuid(), accountName, INRValue], (err, results) => {
            if (err) console.log(err);
            else resolve(true);
        });
    });
}

exports.transaction = async(username,selectedCrypto,cryptoValue) =>{
    let sql = "Insert into transactions values(?,?,?,?,?);";
    return new Promise((resolve, reject) => {
        connection.query(sql, [uuid(), username,  selectedCrypto, cryptoValue, 1], (err, results) => {
            if (err) console.log(err);
            else{
                let sql1 = "update userAccount set INRBalance=INRBalance-? where username=?";
                connection.query(sql1,[cryptoValue, username],(err1,results1)=>{
                    if(err1) console.log(err1)
                    else{
                        console.log("Value Added");
                    }
                })
                resolve(true);
                
            } 
        });
    });
}


exports.transactionDetails = async (username) => {
    let sql = "Select * from transactions where username=? group by crytocurrency;";
    return new Promise((resolve, reject) => {
        connection.query(sql, [username], (err, results) => {
            if (err) console.log(err);
            else if (results.length != 0) {
                console.log(results);
                let finalData=[]
                for(let i=0;i<results.length;i++){
                let responseData = {
                    transactionId: results[i].transactionId,
                    username: results[i].username,
                    cryptocurrency: results[i].crytocurrency,
                    INRAmount: results[i].INRAmount,
                    cryptoValue: results[i].cryptoValue,
                };
                finalData.push(responseData)
                }
                resolve(finalData);
            } else resolve(false);
        });
    });
};