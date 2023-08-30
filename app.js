// подключение express
const express = require("express");
const {appendFile, readFileSync} = require("fs");
const cors = require("cors");
const bodyParser = require('body-parser');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// Загрузка сгенерированного протофайла
const packageDefinition = protoLoader.loadSync('./grpc_client/step_recomendation.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const recomService = protoDescriptor.Recomendation_system;

// Создание клиента
const grpc_client = new recomService('localhost:50051', grpc.credentials.createInsecure())

// создаем объект приложения
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/regions", function (request, response) {
  const content = readFileSync("./base/regions.json","utf8");
  const regions = JSON.parse(content);

  response.send(regions);
});

// Page-1
app.get("/api/site-preparation-works", function (request, response) {
  const content = readFileSync("./base/sitePreparationWorks.json","utf8");
  const jobs = JSON.parse(content);

  response.send(jobs);
});
app.get("/api/works-on-the-site", function (request, response) {
  const content = readFileSync("./base/worksOnTheSite.json","utf8");
  const jobs = JSON.parse(content);

  response.send(jobs);
});
app.get("/api/design-and-project-of-the-house", function (request, response) {
  const content = readFileSync("./base/designAndProjectOfTheHouse.json","utf8");
  const jobs = JSON.parse(content);

  response.send(jobs);
});

// Page-2
app.get("/api/base-types", function (request, response) {
  const content = readFileSync("./base/baseTypes.json","utf8");
  const baseTypes = JSON.parse(content);

  response.send(baseTypes);
});

// Page-3

// базу ещё не заполнил
app.get("/api/wall-material", function (request, response) {
  const content = readFileSync("./base/wallMaterial.json","utf8");
  const baseTypes = JSON.parse(content);

  response.send(baseTypes);
});


/*  запросы в рекомендательную систему  */
app.post("/api/recommedation-system/step1", function (request, response) {
  const homeParams = request.body.homeParams;
  // Создание запроса
  const step1_request = {
    step0: {
      houseArea: homeParams.homeSquare,
      siteArea: homeParams.areaSquare,
      floorCount: homeParams.floor,
      region: homeParams.region,
      budgetFloor: homeParams.budgetFrom,
      budgetCeil: homeParams.budgetUpto,
    },
  };

// Вызов метода recomend_step1 на сервере
  grpc_client.recomend_step1(step1_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step1);
  });
})

app.post("/api/recommedation-system/step2", function (request, response) {
  const homeParams = request.body.homeParams;
  // Создание запроса
  const step2_request = {
    step0: {
      houseArea: homeParams.homeSquare,
      siteArea: homeParams.areaSquare,
      floorCount: homeParams.floor,
      region: homeParams.region,
      budgetFloor: homeParams.budgetFrom,
      budgetCeil: homeParams.budgetUpto,
    },
    step1: {
      sitePreparation: {
        siteChoosing: true,
        geologicalWorks: true,
        geodeticalWorks: true,
        cuttingBushesAndSmallForests: true,
        clearingTheSiteOfDebris: true,
      },
      SiteWorks: {
        cameras: true,
        temporaryFence: true,
      },
      HouseDesignAndProject: {
        homeProject: true,
        designProject: true,
      }
    }
  };

// Вызов метода recomend_step1 на сервере
  grpc_client.recomend_step2(step2_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step2);
  });
})

// начинаем прослушивать подключения на 8000 порту
app.listen(8000);
