const hbs = require('hbs');
const path = require('path');
const express = require('express');
const utility = require("./utility/utility");
const app = express();

const port = process.env.PORT || 3000;

const public_dir_name = path.join(__dirname,"../public");
const templates_dir_name = path.join(__dirname,"../templates/views");
const partials_dir_name = path.join(__dirname,"../templates/partials");

app.set('view engine','hbs');
app.set('views', templates_dir_name);

hbs.registerPartials(partials_dir_name);

app.get('',(request,response) => {
    response.render('index', {
                title: "My dynamic title.",
                author: "Shridhar Dighe",
                fontSize: "h3",
                headerNode: "Weather app"
            });
});

app.use(express.static(public_dir_name));

app.get('/about',(request,response) => {
    response.render('about', {
                title: "About page title.",
                author: "Shridhar Dighe",
                fontSize: "h3",
                headerNode: "Weather app"
            });
});

app.get('/Weather',(request,response) => {
    if(request.query.city != undefined) {
        console.log("Query City - " + request.query.city);
        //response.send("Will try to get you the weather of " + request.query.city);
        utility.getGeoCode(request.query.city, (error, results) => {
                                                    if(error === undefined) {
                                                        utility.getWeather(results.lan, results.lat, (error, results) => { 
                                                                                                        if(error === undefined) {
                                                                                                            response.send({
                                                                                                                message: "Temperature in " + request.query.city + " is " + results.temperature + results.temperatureUnit,
                                                                                                                temperature: results.temperature
                                                                                                            });
                                                                                                        } else {
                                                                                                            response.send({error: "Error occured while getting the weather."});
                                                                                                        }
                                                                                                    });                                                        
                                                    } else {
                                                        response.send({error: "Error occurred while getting the geo location of " + request.query.city});
                                                    }
                                                });
    }else {
        response.send({error: "Please provide the city name as party of the query string."});
    }    
});

app.get('/weather', (req,res) => { res.send("Yes I am case sensitive!"); });

app.get('*', (req,res) => {
    res.send("Cannot load the requested page.");
});

/*app.get('',(request,response) => {
    response.send("<h1>Hello Express!</h1>");
});

app.get('/Help',(request,response) => {
    response.send({ description: "Help for my application!", Version: "1.0"});
});

app.get('/Weather',(request,response) => {
    response.send("Todays weather is good for running!");
});

app.get('/About',(request,response) => {
    response.send("Version 1.0.");
});*/



app.listen(port ,() => {
    console.log("Server is up on port 3000!");
});
