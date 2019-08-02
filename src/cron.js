
var CronJob = require('cron').CronJob;
const axios = require('axios');


 new  CronJob('0 0 * * *', async function() {
  var token = await axios({
    method: "POST",
    url: "http://localhost:4000/",
    data: {
      query: `
      mutation{
        login(input: {user:"System",password:"GSISATEMS"})
      }
          `
    }
  });


const a = await axios({
    method: "POST",
    url: "http://localhost:4000/",
    headers: {
   Authorization: 'Bearer ' + token.data.data.login},
    data: {
      query: `
        mutation {
                createBack(input: {
                  user: "System",
                  location: ""
                } )
                }
        `
    }
  });
  token = '0000000000000000000000000000000000';
  if (a.data.data.createBack) {
    console.log("SYSTEM BACKUP DONE");
  } else {
    console.log("ERROR IN SYSTEM BACKUP");
  }
}, null, true, 'America/New_York');
