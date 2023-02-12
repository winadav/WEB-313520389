//all the modules im going to use
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const csv = require('csvtojson');
const CreateDB = require('./DB/CreateDB')
const CRUD = require('./CRUD');
const SQL = require('./DB/db');
const json = require('body-parser/lib/types/json');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.static('Static'));
app.use(bodyParser.urlencoded({extended:true}));

app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug')



//all the routes that used

app.get('/', (req, res)=>{
    res.redirect('/LoginPage');
});


app.get('/LoginPage', (req, res)=>{
    // res.clearCookie("Current_user");
    res.render('LoginPage');
});

app.get('/HomePage', (req, res)=>{
    res.render('HomePage');
});

app.get('/NewUserPage', (req, res)=>{
    res.render('NewUserPage');
});

app.get('/AboutUsPage', (req, res)=>{
    res.render('AboutUsPage');
});

app.get('/DegreesSearchPage', (req, res)=>{
    res.redirect('/fillDropdownsSearchPage');
});

app.get('/DegreesWeFoundPage', (req, res)=>{
    res.render('DegreesWeFoundPage');
});

app.get('/RanksPage', (req, res)=>{
    res.redirect('/fillDropdownsRanksPage');
});

app.get('/RanksPageAfter', (req, res)=>{
    res.render('RanksPageAfter');
});

app.get('/MyProfilePage', (req, res)=>{
    res.redirect('/fillDropdownsProfilePage');
});

//a get route for adding a cookie
app.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
    res.send('Cookie have been saved successfully');
    });

// get the cookie incoming request
app.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies); });


//SignUp Route
app.post('/SignUp', CRUD.signUpToDb);
app.get('/SignUp', (req, res)=>{
    res.redirect('/LoginPage');
});


//Fill Dropdowns in some of the pages
app.get('/fillDropdownsSearchPage',CRUD.fillDropdownsSearchPage);
app.get('/fillDropdownsProfilePage',CRUD.fillDropdownsProfilePage);
app.get('/fillDropdownsRanksPage',CRUD.fillDropdownsRanksPage);


//Find user requests
app.post('/findUser',CRUD.findUser);
app.post('/findUserSearch',CRUD.findUserSearch);
app.post('/findRanks',CRUD.findRanks);


//Update Functions
app.post('/updateUser', CRUD.UpdateUser);


app.post('/updateRanks', CRUD.UpdateRanks);





////////////////Data Base Route///////////////

//DEGREE Table//
app.get('/CreateDegreesTable',CreateDB.CreateDegreesTable);
app.get('/InsertDataToDegreesTable',CreateDB.InsertDataToDegreesTable);
app.get('/ShowDegreesTable',CreateDB.ShowDegreesTable);
app.get('/DropDegreesTable',CreateDB.DropDegreesTable);

//USERS Table//
app.get('/CreateUsersTable',CreateDB.CreateUsersTable);
app.get('/InsertDataToUsersTable',CreateDB.InsertDataToUsersTable);
app.get('/ShowUsersTable',CreateDB.ShowUsersTable);
app.get('/DropUsersTable',CreateDB.DropUsersTable);

//RANKS Table//
app.get('/CreateRanksTable',CreateDB.CreateRanksTable);
app.get('/InsertDataToRanksTable',CreateDB.InsertDataToRanksTable);
app.get('/ShowRanksTable',CreateDB.ShowRanksTable);
app.get('/DropRanksTable',CreateDB.DropRanksTable);

////////////////////////////////////////////////





//listen
app.listen(port, ()=>{
    console.log("server is running on port " + port);
});
