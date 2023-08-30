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
  const worksSite = JSON.parse(content);

  response.send(worksSite);
});
app.get("/api/design-and-project-of-the-house", function (request, response) {
  const content = readFileSync("./base/page-1/designAndProjectOfTheHouse.json","utf8");
  const design = JSON.parse(content);

  response.send(design);
});

// Page-2
app.get("/api/base-types", function (request, response) {
  const content = readFileSync("./base/page-2/baseTypes.json","utf8");
  const baseTypes = JSON.parse(content);

  response.send(baseTypes);
});

// Page-3
app.get("/api/wall-material", function (request, response) {
  const content = readFileSync("./base/page-3/wallMaterial.json","utf8");
  const wallMaterial = JSON.parse(content);

  response.send(wallMaterial);
});

// Page-4
app.get("/api/number-of-stingrays", function (request, response) {
  const content = readFileSync("./base/page-3/numberOfStingrays.json","utf8");
  const numberStingrays = JSON.parse(content);

  response.send(numberStingrays);
});

app.get("/api/type-of-roof", function (request, response) {
  const content = readFileSync("./base/page-3/typeOfRoof.json","utf8");
  const typeOfRoof = JSON.parse(content);

  response.send(typeOfRoof);
});

// Page-5
app.get("/api/facade-technology", function (request, response) {
  const content = readFileSync("./base/page-3/facadeTechnology.json","utf8");
  const facadeTechnology = JSON.parse(content);

  response.send(facadeTechnology);
});

// Page-8
app.get("/api/rough-work", function (request, response) {
  const content = readFileSync("./base/page-3/roughWork.json","utf8");
  const roughWork = JSON.parse(content);

  response.send(roughWork);
});

app.get("/api/stairs-material", function (request, response) {
  const content = readFileSync("./base/page-3/stairsMaterial.json","utf8");
  const stairsMaterial = JSON.parse(content);

  response.send(stairsMaterial);
});

// начинаем прослушивать подключения на 8000 порту
app.listen(8000);
