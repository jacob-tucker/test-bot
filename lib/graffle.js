require('dotenv').config();
const { HubConnectionBuilder } = require('@microsoft/signalr');
const fetch = require('node-fetch');

function GraffleSDK() {

  let negotiateResult;
  const projectID = process.env.GRAFFLE_MAINNET_PROJECT_ID;

  const negotiate = async () => {

    const authHeader = {
      "graffle-api-key": process.env.GRAFFLE_MAINNET_API_KEY,
      "Content-Type": "application/x-www-form-urlencoded"
    }
    const url = process.env.GRAFFLE_MAINNET_API_URL;
    console.log(url)
    negotiateResult = await fetch(url, { headers: authHeader, method: 'POST', body: {}});
    negotiateResult = await negotiateResult.json(); 
    return negotiateResult;
  };

  this.stream = async (streamCallback) => {
    let res = await negotiate();
    const connection = new HubConnectionBuilder()
      .withUrl(res.url, {
        accessTokenFactory: () => res.accessToken,
      })
      .withAutomaticReconnect()
      .build();

    if (connection) {
      connection.start()
        .then((result) => {
          console.log("1st Parse: "+projectID)
          connection.on(projectID, (message) => {
            var parsedMessage = JSON.parse(message);
            //console.log("Parsing Message for: "+projectID)
            streamCallback(parsedMessage); 
          });
        });
    }
    return connection;
  };
}

module.exports = {
  GraffleSDK
}