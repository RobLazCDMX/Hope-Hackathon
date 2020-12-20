'use strict';
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const request = require("request");
// const morgan = require("morgan")
// const path = require("path");

// app.use(morgan("dev"));

///////////////////
// Static file
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use('/css',express.static(__dirname + "/public/css")); // first we tell it what file we are going to use, than we pass the root directory path. This allow us to reference dirctly in the files
app.use('/img',express.static(__dirname + "/public/img"));



// app.set('views',path.join(__dirname,'views'))

//////////////////////
// Templating Engine
app.set('views', './views');
app.set('view engine', 'ejs'); // This is what allows to make the connection to our .ejs file (a template language)

app.use(bodyParser.urlencoded({extended : true}));

///////////
//routes//
app.use("/", require('./routes/index.js'));



////////////
// SERVER
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`This server is running on ${port}`)
});