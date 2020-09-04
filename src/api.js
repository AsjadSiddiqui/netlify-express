const express = require("express");
const serverless = require("serverless-http");
const https = require('https');

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});


router.get("/api/:varOne/:varTwo/", (req, res) => {
  res.json(req.params);
});

router.get("/api/get/", (req, res) => {
  options = {
    hostname: 'https://jsonplaceholder.typicode.com',
    // port: 443,
    path: '/todos/1',
    method: 'GET'
  }
  const req = https.request(options, resT => {
    console.log(`statusCode: ${resT.statusCode}`)

    resT.on('data', d => {
      res.send(d);
    })
  })

  
});


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
