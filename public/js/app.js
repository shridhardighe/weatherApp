console.log("Client side java script file loaded.");


var form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    var textInput = document.querySelector("#location");
    console.log(textInput.value);

    var uri = encodeURI("http://localhost:3000/weather?city=" + textInput.value);
    //fetch('http://localhost:3000/weather?city=Boston').then((response) => {
    fetch(uri).then((response) => {
        console.log(response);
        response.json().then((data) => {
                if(data.error) {
                    console.log("Error - " + data.error);
                }else {
                    console.log("data received - " + data.temperature);
                }
            });
    });
    event.preventDefault();
});
