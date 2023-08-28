// подключение express
const express = require("express");
const {appendFile, readFileSync} = require("fs");
const cors = require("cors");
// создаем объект приложения
const app = express();
app.use(cors());

app.get("/api/regions", function (request, response) {
  const content = readFileSync("./base/regions.json","utf8");
  const regions = JSON.parse(content);

  response.send(regions);
});

app.get("/api/site-preparation-jobs", function (request, response) {
  const content = readFileSync("./base/sitePreparationJobs.json","utf8");
  const jobs = JSON.parse(content);

  response.send(jobs);
});

app.get("/api/base-types", function (request, response) {
  const content = readFileSync("./base/baseTypes.json","utf8");
  const baseTypes = JSON.parse(content);

  response.send(baseTypes);
});

// начинаем прослушивать подключения на 8000 порту
app.listen(8000);
