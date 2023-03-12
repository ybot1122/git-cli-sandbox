const personalAccessToken = require('./personalAccessToken');

const https = require("https");

const githubApiOptions = {
    headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer " + personalAccessToken,
        "USer-Agent": "Not a real thing?"
    }
}

const main = async () => {
    https
        .get(`https://api.github.com/user`, githubApiOptions, resp => {
        let data = "";
    
        // A chunk of data has been recieved.
        resp.on("data", chunk => {
            data += chunk;
        });
    
        // The whole response has been received. Print out the result.
        resp.on("end", () => {
            let payload = JSON.parse(data);
            console.log("Welcome, " + payload.name); 
            
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
        console.log("Ensure your personal access token is up to date and has the correct scopes (repo, user)");
    });
}

main();