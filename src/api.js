const express = require("express");
const serverless = require("serverless-http");
const https = require("https");
const axios = require("axios");

const app = express();
const router = express.Router();

// -----------------------------------------------------------------------------------------------------

function getSearch(query) {
  return new Promise(async function (resolve, reject) {
    console.log("Sending Request Here !");
    try {
      var url = "https://jsonplaceholder.typicode.com/todos/1";
      var updateResult = [];
      const searchURL =
        "https://www.jiosaavn.com/api.php?p=1&q=" +
        query +
        "&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=20&__call=search.getResults";
      await axios
        .get(searchURL)
        .then(function (response) {
          console.log("GOT RESPONSE !");
          console.log(response);
          resolve(response);
          updateResult = response;
        })
        .catch(function (error) {
          console.log("GOT AN ERRRRRRRRRR");
          console.log(error);
        });
      resolve(updateResult);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }).catch((err) => {
    console.log(err);
  });
}

function getDownloadLink(id, bitrate) {
  return new Promise(async function (resolve, reject) {
    console.log("Sending Request Here !");
    try {
      const temp =
        "ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDyjyrHDLToz5aSZDz4EVS5mI%2B8or4GrNltIrzpdrV309q3CamSsmGSNxw7tS9a8Gtq";
      var url =
        "https://www.jiosaavn.com/api.php?__call=song.generateAuthToken&url=" +
        id +
        "&bitrate=" +
        "320" +
        "&api_version=4&_format=json&ctx=web6dot0&_marker=0";
      console.log(url);
      var updateResult = [];
      await axios
        .get(url)
        .then(function (response) {
          console.log("GOT RESPONSE !");
          // console.log(response);
          resolve(response);
          updateResult = response;
        })
        .catch(function (error) {
          console.log("GOT AN ERRRRRRRRRR");
          console.log(error);
        });
      resolve(updateResult);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }).catch((err) => {
    console.log(err);
  });
}

// ---------------------------------------------------------------------------------------------------------

router.get("/", (req, res) => {
  res.json({
    hello: "hi!",
  });
});

router.get("/test/:varOne/:varTwo/", (req, res) => {
  res.json(req.params);
});

router.get("/search/:query", async (req, res) => {
  res.setHeader("content-type", "application/json");
  var responseOne = await getSearch(req.params.query);
  res.send(responseOne.data);
});

router.get("/download/:id/:bitrate/", async (req, res) => {
  res.setHeader("content-type", "application/json");
  var responseOne = await getDownloadLink(req.params.id, req.params.bitrate);
  res.send(responseOne.data);
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
