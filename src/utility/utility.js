const req = require('request');

const getGeoCode = (address, callback) => {
    const GoogleURL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBKf0HCnvV8B_UlVBDpvZIalr4WoueWAHE&address="+ address;
    req({url:GoogleURL, json:true}, (error,response) => {
        if(error)
        {
            callback(error, undefined);
        }else {
                if(response.body.status == "OK")
                {
                    var Lattitude  = response.body.results[0].geometry.location.lat
                    var Longitude = response.body.results[0].geometry.location.lng;
                    callback(undefined,{lat: Lattitude, lan: Longitude});
                }else{
                    callback({error: "City could not be geo-located."},undefined);
                }
        }
    });
};

const getWeather = (lan, lat, callback) => {
        const url = "https://api.weather.gov/points/" + lat +"," + lan;   //39.7456,-97.0892
        req({url: encodeURI(url), headers: { "User-Agent" : "MyApp/V1.0 (shridhar.dighe@gmail.com)"}},(error, response) => {
            if(error) {
                callback(error, undefined);
            }else {
                var data = JSON.parse(response.body);
                console.log(data);
                const nextURL = data.properties.forecast;
                req({url: encodeURI(nextURL), headers: { "User-Agent" : "MyApp/V1.0 (shridhar.dighe@gmail.com)"}},(error, response) => {
                    if(error) { 
                        callback(error, undefined);
                    } else {
                        var data = JSON.parse(response.body);
                        console.log("returning - " +  data.properties.periods[0]);
                        callback(undefined, data.properties.periods[0]);
                    }
                 });
            }
        });
};

module.exports = {
    getGeoCode: getGeoCode,
    getWeather: getWeather
}
