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


/*  запросы в рекомендательную систему  */
app.post("/api/recommedation-system/step1", function (req, res) {
  const homeParams = req.body.homeParams;
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

  grpc_client.recomend_step1(step1_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step1);
    res.send(response.step1);
  });
})

app.post("/api/recommedation-system/step2", function (req, res) {
  const homeParams = req.body.homeParams;
  const step1Req = req.body.step1;
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
        siteChoosing: step1Req.sitePreparation.siteChoosing,
        geologicalWorks: step1Req.sitePreparation.geologicalWorks,
        geodeticalWorks: step1Req.sitePreparation.geodeticalWorks,
        cuttingBushesAndSmallForests: step1Req.sitePreparation.cuttingBushesAndSmallForests,
        clearingTheSiteOfDebris: step1Req.sitePreparation.clearingTheSiteOfDebris,
      },
      SiteWorks: {
        cameras: step1Req.SiteWorks.cameras,
        temporaryFence: step1Req.SiteWorks.temporaryFence,
      },
      HouseDesignAndProject: {
        homeProject: step1Req.HouseDesignAndProject.homeProject,
        designProject: step1Req.HouseDesignAndProject.designProject,
      }
    }
  };

  grpc_client.recomend_step2(step2_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step2);
    res.send(response.step2);
  });
})

app.post("/api/recommedation-system/step3", function (req, res) {
  const homeParams = req.body.homeParams;
  const step1Req = req.body.step1;
  const foundationType = req.body.foundationType;

  const step3_request = {
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
        siteChoosing: step1Req.sitePreparation.siteChoosing,
        geologicalWorks: step1Req.sitePreparation.geologicalWorks,
        geodeticalWorks: step1Req.sitePreparation.geodeticalWorks,
        cuttingBushesAndSmallForests: step1Req.sitePreparation.cuttingBushesAndSmallForests,
        clearingTheSiteOfDebris: step1Req.sitePreparation.clearingTheSiteOfDebris,
      },
      SiteWorks: {
        cameras: step1Req.SiteWorks.cameras,
        temporaryFence: step1Req.SiteWorks.temporaryFence,
      },
      HouseDesignAndProject: {
        homeProject: step1Req.HouseDesignAndProject.homeProject,
        designProject: step1Req.HouseDesignAndProject.designProject,
      }
    },
    step3: {
      foundationType: foundationType,
    }
  };

  grpc_client.recomend_step3(step3_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step3);
    res.send(response.step3);
  });
})

// начинаем прослушивать подключения на 8000 порту
app.listen(8000);
