const sqlConnection = require("./DB/db");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));


const signUpToDb = (req,res)=>{
    //validate body exists
 if (!req.body) {
 res.status(400).send({
 message: "Content can not be empty!"
 });
 return;
 }

 //pull data from body to jason
 const newUser = {
     "Username": req.body.Username,
     "Password": req.body.Password,
     "Email": req.body.Email,
     "FirstName": req.body.FirstName,
     "LastName": req.body.LastName,
     "PhoneNumber": req.body.PhoneNumber
};
const Q12 = "SELECT * FROM USERS where Username = ? "
sqlConnection.query(Q12, [newUser.Username], (err, mysqlres2) => {
    if (err) {
        console.log("error is: " + err);
        res.status(400).send({message: "could not find User " + err});
        return;
    }

    if(mysqlres2.length>0){
        console.log("Username is already taken!");
        
        res.render('NewUserPage.pug',{message: "Username is Already Taken!" , password: newUser.Password , firstName: newUser.FirstName, lastName: newUser.LastName,phoneNum: newUser.PhoneNumber });
        return;
    }

    const Q12 = "SELECT * FROM USERS where Email = ? "
sqlConnection.query(Q12, [newUser.Email], (err, mysqlres1) => {
    if (err) {
        console.log("error is: " + err);
        res.status(400).send({message: "could not find User " + err});
        return;
    }

    if(mysqlres1.length>0){
        console.log("Email is already Taken!");
        
        res.render('NewUserPage.pug',{message: "Email is Already Taken!" , password: newUser.Password , firstName: newUser.FirstName, lastName: newUser.LastName,phoneNum: newUser.PhoneNumber });
        return;
    }


    //run query
    const Q1 = "INSERT INTO USERS SET ?"
    sqlConnection.query(Q1,newUser, (err,mysqlres)=>{
        if(err) {
            console.log("error",err);
            res.status(400).send({message: "error in SignUp" + err});
            return;
        }

        console.log("New User Created!");
        res.render('LoginPage',mysqlres)
        return;

    })
})
})
}





const findUser = (req,res) => {
    // check if body is empty
    if (!req.body) {
        res.status(400).send({message: "Please Fill All Fields"});
        return;
    }
    //if body not empty - create new customer
    const username = req.body.Username;
    const password = req.body.Password;
    //run query
    const Q3 = "SELECT * FROM USERS where Username like ? AND Password like ?"
    sqlConnection.query(Q3, [username,password], (err, mysqlres) => {
        if (err) {
            console.log("error is: " + err);
            res.status(400).send({message: "could not find User " + err});
            return;
        }

        if(mysqlres.length==0){
            console.log("User Not Found");
            
            res.render('LoginPage.pug',{message: "One or more of the details you entered are incorrect" , username: username });
            return;
        }
        // if not query error
        console.log("User Found!");
        //insert data into coockie
        res.cookie('Current_user',mysqlres)
        res.render('HomePage.pug',{ username: username });
        return;
        ;
    })
}


const fillDropdownsSearchPage = (req,res) => {
    const Q4 = "SELECT Distinct DegreeName FROM DEGREES Order By DegreeName ASC";
    sqlConnection.query(Q4,( err, mysqlres1)=>{
                if(err) {
            console.log("error",err);
            res.status(400).send({message: "error in selecting all degrees name" + err});
            return;
        }

        const Q5 = "SELECT Distinct Institution FROM DEGREES Order By Institution ASC";
        sqlConnection.query(Q5,( err, mysqlres2)=>{
              if(err) {
             console.log("error",err);
             res.status(400).send({message: "error in selecting all instituion" + err});
             return;
      }


      res.render('DegreesSearchPage.pug',{degreeList: mysqlres1 , institutionList: mysqlres2});
      return;
})

})
};

const fillDropdownsProfilePage = (req,res) => {
    const Q4 = "SELECT Distinct DegreeName FROM RANKS Order By DegreeName ASC";
    sqlConnection.query(Q4,( err, mysqlres1)=>{
                if(err) {
            console.log("error",err);
            res.status(400).send({message: "error in selecting all degrees name" + err});
            return;
        }

        const Q5 = "SELECT Distinct Institution FROM RANKS Order By Institution ASC";
        sqlConnection.query(Q5,( err, mysqlres2)=>{
              if(err) {
             console.log("error",err);
             res.status(400).send({message: "error in selecting all instituion" + err});
             return;
      }
      console.log(req.cookies.Current_user);
      console.log(req.cookies.Current_user[0].Username);
      res.render('MyProfilePage.pug',{degreeList: mysqlres1 , institutionList: mysqlres2, username: req.cookies.Current_user[0].Username ,email: req.cookies.Current_user[0].Email,password: req.cookies.Current_user[0].Password,firstName: req.cookies.Current_user[0].FirstName,lastName: req.cookies.Current_user[0].LastName,phoneNum: req.cookies.Current_user[0].PhoneNumber });
      return;
})

})
};

const fillDropdownsRanksPage = (req,res) => {
    const Q4 = "SELECT Distinct DegreeName FROM RANKS Order By DegreeName ASC";
    sqlConnection.query(Q4,( err, mysqlres1)=>{
                if(err) {
            console.log("error",err);
            res.status(400).send({message: "error in selecting all degrees name" + err});
            return;
        }

        const Q5 = "SELECT Distinct Institution FROM RANKS Order By Institution ASC";
        sqlConnection.query(Q5,( err, mysqlres2)=>{
              if(err) {
             console.log("error",err);
             res.status(400).send({message: "error in selecting all instituion" + err});
             return;
      }

      res.render('RanksPage.pug',{degreeList: mysqlres1 , institutionList: mysqlres2});
      return;
})

})
};




const findUserSearch = (req,res) => {

    var Q;
    var degreeType = req.body.DegreeType;
    var degreeName = req.body.DegreeName;
    var institution = req.body.Institution;
    var district = req.body.District;
    var psychometric = req.body.sliderValue;
    
    var fields;


  switch (degreeType) {
    case 'All':
        switch (institution) {
            case 'All':
                if(district ='All'){Q = "SELECT * FROM DEGREES where DegreeName like ? AND PsychometricScore <= ? " ,fields = ['%'+degreeName+'%',psychometric] }
                else {Q = "SELECT * FROM DEGREES where DegreeName like ? AND District like ? AND PsychometricScore <= psychometric ", fields = ['%'+degreeName,district,psychometric] }
                break;
        
            default: 
                if(district ='All'){Q = "SELECT * FROM DEGREES where DegreeName like ? AND Institution like ? AND PsychometricScore <= ? ", fields = [degreeName,institution,psychometric]  }
                else {Q = "SELECT * FROM DEGREES where DegreeName like ? AND Institution like ? AND District like ? AND PsychometricScore <= ? " , fields = [degreeName,institution,district,psychometric]}
                break;
        }
        break;
  
    default:
        switch (institution) {
            case 'All':
                if(district ='All'){Q = "SELECT * FROM DEGREES where DegreeName like ? AND DegreeType like ? AND PsychometricScore <= ? ", fields = [degreeName,'%'+degreeType+'%',psychometric]}
                else {Q = "SELECT * FROM DEGREES where DegreeName like ? AND DegreeType like ? AND District like ? AND PsychometricScore <= ? ", fields = [degreeName,'%'+degreeType+'%',district,psychometric]}
                break;
        
            default:
                if(district ='All'){Q = "SELECT * FROM DEGREES where DegreeName like ? AND Institution like ? AND DegreeType like ? AND PsychometricScore <= ? ", fields = [degreeName,'%'+institution,'%'+degreeType+'%',psychometric] }
                else {Q = "SELECT * FROM DEGREES where DegreeName like ? AND Institution like ? AND DegreeType like ? AND District like ? AND PsychometricScore <= ? ", fields = [degreeName,'%'+institution,'%'+degreeType+'%',district,psychometric]}
                break;
        }
        break;
  }

    //run query
    sqlConnection.query(Q, fields , (err, mysqlres) => {
        if (err) {
            console.log("error is: " + err);
            res.status(400).send({message: "could not search degree " + err});
            return;
        }
        // if not query error
        //console.log("Records Found: ",  mysqlres);
        //res.send(mysqlres);
        res.render('DegreesWeFoundPage.pug',{data: mysqlres});
        return;
    })
}




const findRanks = (req,res) => {

    var Q;
    var degreeName = req.body.DegreeName;
    var institution = req.body.AcademicInstitution;
    var orderBy = req.body.fav_rate;

    
    var fields;

  switch (institution) {
    case 'All':
        switch (orderBy) {
            case 'prestigeRate':
                Q = "SELECT * FROM RANKS where DegreeName like ? ORDER BY Prestige DESC" ,fields = ['%'+degreeName+'%'] 
                break;

            case 'lecturersRate':
                Q = "SELECT * FROM RANKS where DegreeName like ? ORDER BY Lecturers DESC" ,fields = ['%'+degreeName+'%'] 
                break;

            case 'satisfactionRate':
                Q = "SELECT * FROM RANKS where DegreeName like ? ORDER BY Satisfaction DESC" ,fields = ['%'+degreeName+'%'] 
                break;
            
            case 'socialRate':
                Q = "SELECT * FROM RANKS where DegreeName like ? ORDER BY Social DESC" ,fields = ['%'+degreeName+'%'] 
                break; 

            default: 
                Q = "SELECT * FROM RANKS where DegreeName like ? ORDER BY Total DESC" ,fields = ['%'+degreeName+'%'] 
                break;
        }
        break;
  
    default:
        switch (orderBy) {
            case 'prestigeRate':
                Q = "SELECT * FROM RANKS where DegreeName like ? AND Institution like ? ORDER BY Prestige DESC" ,fields = ['%'+degreeName+'%','%'+institution] 
                break;

            case 'lecturersRate':
                Q = "SELECT * FROM RANKS where DegreeName like ? AND Institution like ? ORDER BY Lecturers DESC" ,fields = ['%'+degreeName+'%','%'+institution]  
                break;

            case 'satisfactionRate':
                Q = "SELECT * FROM RANKS where DegreeName like ? AND Institution like ? ORDER BY Satisfaction DESC" ,fields = ['%'+degreeName+'%','%'+institution] 
                break;
            
            case 'socialRate':
                Q = "SELECT * FROM RANKS where DegreeName like ? AND Institution like ? ORDER BY Social DESC" ,fields = ['%'+degreeName+'%','%'+institution] 
                break; 

            default: 
                Q = "SELECT * FROM RANKS where DegreeName like ? AND Institution like ? ORDER BY Total DESC" ,fields = ['%'+degreeName+'%','%'+institution] 
                break;
        }
        break;
  }

    //run query
    sqlConnection.query(Q, fields , (err, mysqlres) => {
        if (err) {
            console.log("error is: " + err);
            res.status(400).send({message: "could not search degree " + err});
            return;
        }

        const Q4 = "SELECT Distinct DegreeName FROM DEGREES Order By DegreeName ASC";
        sqlConnection.query(Q4,( err, mysqlres1)=>{
                    if(err) {
                console.log("error",err);
                res.status(400).send({message: "error in selecting all degrees name" + err});
                return;
            }

            const Q5 = "SELECT Distinct Institution FROM DEGREES Order By Institution ASC";
            sqlConnection.query(Q5,( err, mysqlres2)=>{
                  if(err) {
                 console.log("error",err);
                 res.status(400).send({message: "error in selecting all instituion" + err});
                 return;
          }
          console.log(mysqlres);
          res.render('RanksPageAfter.pug',{data: mysqlres, degreeList: mysqlres1 , institutionList: mysqlres2,degreeName1: degreeName,institution1: institution});
          return;
    })
    
    })

    })
    }






const UpdateUser = (req,res) =>{

    // check if body is empty
    if (!req.body) {
    res.status(400).send({message: "content can not be empty"});
    return;
    }
    var UpdateUser = {
        "Username": req.body.Username,
        "Password": req.body.Password,
        "Email": req.body.Email,
        "FirstName": req.body.FirstName,
        "LastName": req.body.LastName,
        "PhoneNumber": req.body.PhoneNumber
    };

    const Q9 = "UPDATE USERS SET Email = ?,Password = ?,FirstName = ?,LastName = ?,PhoneNumber = ?  WHERE Username = ?";
    const data = [UpdateUser.Email,UpdateUser.Password,UpdateUser.FirstName,UpdateUser.LastName,UpdateUser.PhoneNumber,UpdateUser.Username];
    // execute query
    sqlConnection.query(Q9, data, (err, results,fields)=>{
    if (err) {
    console.log("error is: " + err);
    res.status(400).send({message: "error in updating user " + err});
    return;
    }
    console.log("rows effected ", results.affectedRows);
    //insert data into coockie
    res.cookie('Current_user',UpdateUser);
    console.log(req.cookies.Current_user[0]);
    res.render('HomePage.pug',{username: req.body.Username});
    });
    };



    const UpdateRanks = (req,res) =>{
        // check if body is empty
        if (!req.body) {
        res.status(400).send({message: "content can not be empty"});
        return;
        }

            var degreeNameUser = req.body.DegreeName;
            var institutionUser = req.body.Institution;
            var prestigeUser = parseFloat(req.body.sliderValuePrestige);
            var lecturersUser = parseFloat(req.body.sliderValueLecturers);
            var satisfactionUser = parseFloat(req.body.sliderValueSatisfaction);
            var socialUser = parseFloat(req.body.sliderValueSocial);
            
            

        //Get the degree an institution who ranked
        const Q8 = "SELECT * FROM RANKS WHERE DegreeName like ? AND Institution like ?";
        sqlConnection.query(Q8,[req.body.DegreeName,req.body.Institution],( err, mysqlres1)=>{
            if(err) {
        console.log("error",err);
        res.status(400).send({message: "error in selecting all RANKS name" + err});
        return;
    }
        console.log(mysqlres1);

        //Calculate the new rating according to the user's current rank
        let oldNumberOfUsers = parseFloat(mysqlres1[0].NumberOfUsers);
        let oldPrestige =  parseFloat(mysqlres1[0].Prestige);
        let oldLecturers =  parseFloat(mysqlres1[0].Lecturers);
        let oldSatisfaction =  parseFloat(mysqlres1[0].Satisfaction);
        let oldSocial =  parseFloat(mysqlres1[0].Social);

        let newNumberOfUsers = oldNumberOfUsers + 1;
        let newPrestige =  ((oldPrestige * oldNumberOfUsers + prestigeUser) / newNumberOfUsers).toFixed(1);
        let newLecturers =  ((oldLecturers * oldNumberOfUsers + lecturersUser) / newNumberOfUsers).toFixed(1);
        let newSatisfaction =  ((oldSatisfaction * oldNumberOfUsers + satisfactionUser) / newNumberOfUsers).toFixed(1);
        let newSocial =  ((oldSocial * oldNumberOfUsers + socialUser) / newNumberOfUsers).toFixed(1);
        let newTotal =  (parseFloat(newPrestige) +parseFloat(newLecturers) + parseFloat(newSatisfaction) +parseFloat(newSocial)).toFixed(1);

        var TheNewRank = {
            "DegreeName": req.body.DegreeName,
            "Institution": req.body.Institution,
            "Prestige": newPrestige.toString(),
            "Lecturers": newLecturers.toString(),
            "Satisfaction": newSatisfaction.toString(),
            "Social": newSocial.toString(),
            "Total": newTotal.toString(),
            "NumberOfUsers": newNumberOfUsers.toString()
            
        };
        console.log(TheNewRank);

        //Update The New Ranks in RANKS Table
        const Q10 = "UPDATE RANKS SET Prestige = ?,Lecturers = ?,Satisfaction = ?,Social = ?, Total = ?, NumberOfUsers = ?  WHERE DegreeName like ? AND Institution like ?";
        const data = [TheNewRank.Prestige,TheNewRank.Lecturers,TheNewRank.Satisfaction,TheNewRank.Social,TheNewRank.Total,TheNewRank.NumberOfUsers,degreeNameUser,institutionUser];
        // execute query
        sqlConnection.query(Q10, data, (err, results,fields)=>{
            if (err) {
            console.log("error is: " + err);
            res.status(400).send({message: "error in updating user " + err});
            return;
            }
            console.log("rows effected ", results.affectedRows);
            res.render('HomePage.pug');
            });        

       });

    };







module.exports = {signUpToDb,findUserSearch,findRanks,fillDropdownsSearchPage,fillDropdownsProfilePage,fillDropdownsRanksPage,findUser,UpdateUser,UpdateRanks};