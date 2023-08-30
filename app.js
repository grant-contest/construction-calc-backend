// подключение express
const express = require("express");
const {appendFile, readFileSync} = require("fs");
const cors = require("cors");
// создаем объект приложения
const app = express();
app.use(cors());

app.get("/api/regions", function (request, response) {
  const content = readFileSync("./base/page-0/regions.json","utf8");
  const regions = JSON.parse(content);

  response.send(regions);
});

// Page-1
app.get("/api/site-preparation-works", function (request, response) {
  const content = readFileSync("./base/page-1/sitePreparationWorks.json","utf8");
  const jobs = JSON.parse(content);

  response.send(jobs);
});
app.get("/api/works-on-the-site", function (request, response) {
  const content = readFileSync("./base/page-1/worksOnTheSite.json","utf8");
  const jobs = JSON.parse(content);

  response.send(jobs);
});
app.get("/api/design-and-project-of-the-house", function (request, response) {
  const content = readFileSync("./base/page-1/designAndProjectOfTheHouse.json","utf8");
  const jobs = JSON.parse(content);

  response.send(jobs);
});

// Page-2
app.get("/api/base-types", function (request, response) {
  const content = readFileSync("./base/page-2/baseTypes.json","utf8");
  const baseTypes = JSON.parse(content);

  response.send(baseTypes);
});

// Page-3

// базу ещё не заполнил
app.get("/api/wall-material", function (request, response) {
  const content = readFileSync("./base/page-3/wallMaterial.json","utf8");
  const baseTypes = JSON.parse(content);

  response.send(baseTypes);
});

// начинаем прослушивать подключения на 8000 порту
app.listen(8000);
