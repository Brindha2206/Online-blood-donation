const mysql = require("mysql2")

const db = mysql.createConnection({

    "host":"localhost",
    // "port":3306,
    "user":"root",
    "password":"22br06un2005dha",
    "database":"blood_donation"
})

db.connect((err)=>{
    if(err){
        console.log(err)
        return
    }
    else{
    console.log("Database connected")
    }
})

module.exports = db