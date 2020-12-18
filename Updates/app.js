const express = require("express");
const request = require("request");
const morgan = require("morgan")
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

// app.use(morgan("dev"));



// app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs'); // This is what allows to make the connection to our .ejs file (a template language)
app.use(bodyParser.urlencoded({extended : true}));
// app.use(express.static('public'));
app.use(express.static(__dirname + "/public"));

app.get('/',(req, res) => {
    
    res.render('index'); // We are passing data to our ejs file
})


const options = {
    url: 'https://covid-1931.p.rapidapi.com/',
    method: 'GET',
    headers: {
      'x-rapidapi-key': '8d3ff04f12mshf3fa785f31e11b5p1be5e8jsn247990048584',
      'x-rapidapi-host': 'covid-1931.p.rapidapi.com',
      useQueryString: true
    }
};
  


app.get('/', (req, res) => {
    request(options, (err, response, body) => {
        if (err) {
          console.log("error:", err);
        } else {
        
      
          let states = (JSON.parse(body)[0].states.fields[7].mapValue.fields.state.stringValue);
      
          res.send("index",{states:states});

        }
    });
})





// request(options, function(err, response,body){
//     if(err){
//         res.render('index')
//     }
//     else{
//         let weather = JSON.parse(body)
//         if(weather.main == undefined){
//             res.render('index')
//         } else{
//             let weatherText = `Its ${weather.main.temp} degress in ${weather.name}`
//             res.render('index')
//         }
//     } 
// })






// SERVER
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`This server is running on ${port}`)
});