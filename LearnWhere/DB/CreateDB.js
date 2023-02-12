var SQL = require('./db');
const path = require('path');
const csv = require('csvtojson');


const CreateTable = (req,res)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS items (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), name VARCHAR(255))";
    SQL.query(Q1,(err,mysqlres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created items table table');
        res.send("items table created");
        return;
    })      
}

const InsertData = (req,res)=>{
    var Q2 = "INSERT INTO items SET ?";
    const csvFilePath= path.join("Content", "example.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "email": element.email,
            "name": element.name
            
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    
    res.send("data inserted");

};

const CreateDegreesTable = (req,res)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS DEGREES (id INT AUTO_INCREMENT PRIMARY KEY, DegreeName VARCHAR(255), DegreeType VARCHAR(255) , Institution VARCHAR(255) , Location VARCHAR(255) , District VARCHAR(255) , Cost VARCHAR(255) , CombainScore VARCHAR(255) ,PsychometricScore VARCHAR(255) , Link VARCHAR(255) )";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created items table table');
        res.send("items table created");
        return;
    })      
}

const InsertDataToDegreesTable = (req,res)=>{
    var Q2 = "INSERT INTO DEGREES SET ?";
    const csvFilePath= path.join("Content", "degrees.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    //console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "DegreeName": element.DegreeName,
            "DegreeType": element.DegreeType,
            "Institution": element.Institution,
            "Location": element.Location,
            "District": element.District,
            "Cost": element.Cost,
            "CombainScore": element.CombainScore,
            "PsychometricScore": element.PsychometricScore,
            "Link": element.Link
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    
    res.send("data inserted");

};

const ShowDegreesTable = (req,res)=>{
    var Q3 = "SELECT * FROM DEGREES";
    SQL.query(Q3, (err, mysqlres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mysqlres);
        return;
    })};

    const DropDegreesTable = (req, res)=>{
        var Q4 = "DROP TABLE DEGREES";
        SQL.query(Q4, (err, mysqlres)=>{
            if (err) {
                console.log("error in droping table ", err);
                res.status(400).send({message: "error om dropping table" + err});
                return;
            }
            console.log("table drpped");
            res.send("table drpped");
            return;
        })
    }

/////////////////////USERS Table//////////////////////

const CreateUsersTable = (req,res)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS USERS (id INT AUTO_INCREMENT PRIMARY KEY, Username VARCHAR(255), Password VARCHAR(255) , Email VARCHAR(255) , FirstName VARCHAR(255) , LastName VARCHAR(255) , PhoneNumber VARCHAR(255) )";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating USERS table"});
            return;
        }
        console.log('created USERS  table');
        res.send("USERS table created");
        return;
    })      
}

const InsertDataToUsersTable = (req,res)=>{
    var Q2 = "INSERT INTO USERS SET ?";
    const csvFilePath= path.join("Content", "users.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    //console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "Username": element.Username,
            "Password": element.Password,
            "Email": element.Email,
            "FirstName": element.FirstName,
            "LastName": element.LastName,
            "PhoneNumber": element.PhoneNumber

        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    
    res.send("data inserted");

};

const ShowUsersTable = (req,res)=>{
    var Q3 = "SELECT * FROM USERS";
    SQL.query(Q3, (err, mysqlres)=>{
        if (err) {
            console.log("error in showing USERS table ", err);
            res.send("error in showing USERS table ");
            return;
        }
        console.log("showing USERS table");
        res.send(mysqlres);
        return;
    })};

    const DropUsersTable = (req, res)=>{
        var Q4 = "DROP TABLE USERS";
        SQL.query(Q4, (err, mysqlres)=>{
            if (err) {
                console.log("error in droping table USERS ", err);
                res.status(400).send({message: "error oN dropping table USERS" + err});
                return;
            }
            console.log("table USERS drpped");
            res.send("table USERS drpped");
            return;
        })
    }


//////////Ranks Table///////////
const CreateRanksTable = (req,res)=> {
    var Q1 = "CREATE TABLE IF NOT EXISTS RANKS (id INT AUTO_INCREMENT PRIMARY KEY, DegreeName VARCHAR(255), Institution VARCHAR(255) , Prestige VARCHAR(255) , Lecturers VARCHAR(255) , Satisfaction VARCHAR(255) , Social VARCHAR(255), Total VARCHAR(255),NumberOfUsers VARCHAR(255))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating Ranks table"});
            return;
        }
        console.log('created Ranks  table');
        res.send("Ranks table created");
        return;
    })      
}

const InsertDataToRanksTable = (req,res)=>{
    var Q2 = "INSERT INTO RANKS SET ?";
    const csvFilePath= path.join("Content", "ranks.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    //console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "DegreeName": element.DegreeName,
            "Institution": element.Institution,
            "Prestige": element.Prestige,
            "Lecturers": element.Lecturers,
            "Satisfaction": element.Satisfaction,
            "Social": element.Social,
            "Total": element.Total,
            "NumberOfUsers": element.NumberOfUsers

        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });
    
    res.send("data inserted");

};

const ShowRanksTable = (req,res)=>{
    var Q3 = "SELECT * FROM RANKS";
    SQL.query(Q3, (err, mysqlres)=>{
        if (err) {
            console.log("error in showing Ranks table ", err);
            res.send("error in showing Ranks table ");
            return;
        }
        console.log("showing Ranks table");
        res.send(mysqlres);
        return;
    })};

    const DropRanksTable = (req, res)=>{
        var Q4 = "DROP TABLE RANKS";
        SQL.query(Q4, (err, mysqlres)=>{
            if (err) {
                console.log("error in droping table Ranks ", err);
                res.status(400).send({message: "error oN dropping table Ranks" + err});
                return;
            }
            console.log("table Ranks drpped");
            res.send("table Ranks drpped");
            return;
        })
    }




module.exports = {CreateDegreesTable, InsertDataToDegreesTable,ShowDegreesTable,DropDegreesTable,CreateUsersTable,InsertDataToUsersTable,ShowUsersTable,DropUsersTable,CreateRanksTable,InsertDataToRanksTable,ShowRanksTable,DropRanksTable};