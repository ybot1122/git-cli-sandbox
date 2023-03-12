const personalAccessToken = require('./personalAccessToken');

const https = require("https");

const main = async () => {
    https
        .get(`https://reqres.in/api/users`, resp => {
        let data = "";
    
        // A chunk of data has been recieved.
        resp.on("data", chunk => {
            data += chunk;
        });
    
        // The whole response has been received. Print out the result.
        resp.on("end", () => {
            let url = JSON.parse(data).message;
            console.log(url); 
            
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            readline.question('Who are you? \n', name => {
                console.log(`Hey there ${name}!`);
                readline.close();
            });            
        });
    }).on("error", err => {
        console.log("Error: " + err.message);
    });
}

main();