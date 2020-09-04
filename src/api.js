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




app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
