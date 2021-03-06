const express = require('express');
const dotenv = require('dotenv');

const mysql = require('mysql');
const bodyParser  = require("body-parser");
const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


const connection = mysql.createConnection({
  host     : 'localhost' , 
  user     : 'root', 
  password : 'sopheak1234',
  database : 'social_db' 
});

const port = process.env.PORT || 8080;

// const connection = mysql.createConnection({
//     host     : process.env.HOST,
//     user     : process.env.USER,
//     password : process.env.DATABASE_PASSWORD,
//     database : process.env.DATABASE_NAME
//   });

app.get("/", function(req, res){
    // Find count of users in DB
    const q = "SELECT COUNT(*) AS count FROM users_demo";
    connection.query(q, function(err, results){
        if(err) throw err;
        const count = results[0].count; 
        res.render("home", {count: count});
    });
});

app.post("/register", function(req, res){
    const person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users_demo SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

app.listen(port, function(){
    console.log("Server running on port " + port);
});
