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
  const content = readFileSync("./base/page-0/regions.json", "utf8");
  const regions = JSON.parse(content);

  response.send(regions);
});

// Page-1
app.get("/api/site-preparation-works", function (request, response) {
  const content = readFileSync("./base/page-1/sitePreparationWorks.json", "utf8");
  const jobs = JSON.parse(content);

  response.send(jobs);
});
app.get("/api/works-on-the-site", function (request, response) {
  const content = readFileSync("./base/page-1/worksOnTheSite.json", "utf8");
  const worksSite = JSON.parse(content);

  response.send(worksSite);
});
app.get("/api/design-and-project-of-the-house", function (request, response) {
  const content = readFileSync("./base/page-1/designAndProjectOfTheHouse.json", "utf8");
  const design = JSON.parse(content);

  response.send(design);
});

// Page-2
app.get("/api/base-types", function (request, response) {
  const content = readFileSync("./base/page-2/baseTypes.json", "utf8");
  const baseTypes = JSON.parse(content);

  response.send(baseTypes);
});

// Page-3
app.get("/api/wall-material", function (request, response) {
  const content = readFileSync("./base/page-3/wallMaterial.json", "utf8");
  const wallMaterial = JSON.parse(content);

  response.send(wallMaterial);
});

// Page-4
app.get("/api/number-of-stingrays", function (request, response) {
  const content = readFileSync("./base/page-4/numberOfStingrays.json", "utf8");
  const numberStingrays = JSON.parse(content);

  response.send(numberStingrays);
});

app.get("/api/type-of-roof", function (request, response) {
  const content = readFileSync("./base/page-4/typeOfRoof.json", "utf8");
  const typeOfRoof = JSON.parse(content);

  response.send(typeOfRoof);
});

// Page-5
app.get("/api/facade-technology", function (request, response) {
  const content = readFileSync("./base/page-5/facadeTechnology.json", "utf8");
  const facadeTechnology = JSON.parse(content);

  response.send(facadeTechnology);
});

// Page-6
app.get("/api/window-material", function (request, response) {
  const content = readFileSync("./base/page-6/windowMaterial.json", "utf8");
  const windowMaterial = JSON.parse(content);

  response.send(windowMaterial);
});

app.get("/api/type-of-windows", function (request, response) {
  const content = readFileSync("./base/page-6/typeOfWindows.json", "utf8");
  const typeOfWindows = JSON.parse(content);

  response.send(typeOfWindows);
});

app.get("/api/door-material", function (request, response) {
  const content = readFileSync("./base/page-6/doorMaterial.json", "utf8");
  const doorMaterial = JSON.parse(content);

  response.send(doorMaterial);
});

// Page-7
app.get("/api/electrics", function (request, response) {
  const content = readFileSync("./base/page-7/electrics.json", "utf8");
  const electrics = JSON.parse(content);

  response.send(electrics);
});

app.get("/api/water-supply", function (request, response) {
  const content = readFileSync("./base/page-7/waterSupply.json", "utf8");
  const waterSupply = JSON.parse(content);

  response.send(waterSupply);
});

app.get("/api/sewage-system", function (request, response) {
  const content = readFileSync("./base/page-7/sewageSystem.json", "utf8");
  const sewageSystem = JSON.parse(content);

  response.send(sewageSystem);
});

app.get("/api/heating", function (request, response) {
  const content = readFileSync("./base/page-7/heating.json", "utf8");
  const heating = JSON.parse(content);

  response.send(heating);
});

app.get("/api/ventilation", function (request, response) {
  const content = readFileSync("./base/page-7/ventilation.json", "utf8");
  const ventilation = JSON.parse(content);

  response.send(ventilation);
});

// Page-8
app.get("/api/rough-work", function (request, response) {
  const content = readFileSync("./base/page-8/roughWork.json", "utf8");
  const roughWork = JSON.parse(content);

  response.send(roughWork);
});

app.get("/api/stairs-material", function (request, response) {
  const content = readFileSync("./base/page-8/stairsMaterial.json", "utf8");
  const stairsMaterial = JSON.parse(content);

  response.send(stairsMaterial);
});

// Page-9
app.get("/api/wall-decoration", function (request, response) {
  const content = readFileSync("./base/page-9/wallDecoration.json", "utf8");
  const wallDecoration = JSON.parse(content);

  response.send(wallDecoration);
});

app.get("/api/floor-covering", function (request, response) {
  const content = readFileSync("./base/page-9/floorCovering.json", "utf8");
  const floorCovering = JSON.parse(content);

  response.send(floorCovering);
});

app.get("/api/ceiling-covering", function (request, response) {
  const content = readFileSync("./base/page-9/ceilingCovering.json", "utf8");
  const ceilingCovering = JSON.parse(content);

  response.send(ceilingCovering);
});


/*  запросы в рекомендательную систему  */
app.post("/api/recommedation-system/step1", function (req, res) {
  const homeParams = req.body.homeParams;
  const step_request = {
    step0: {
      houseArea: homeParams.homeSquare,
      siteArea: homeParams.areaSquare,
      floorCount: homeParams.floor,
      region: homeParams.region,
      budgetFloor: homeParams.budgetFrom,
      budgetCeil: homeParams.budgetUpto,
    },
  };

  grpc_client.recomend_step1(step_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    res.send(response.step1);
  });
})

app.post("/api/recommedation-system/step2", function (req, res) {
  const homeParams = req.body.homeParams;
  const step1Req = req.body.step1;
  const step_request = {
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

  grpc_client.recomend_step2(step_request, (error, response) => {
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
  const foundationType = req.body.step2.foundationType;

  const step_request = {
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
    step2: {
      foundationType: foundationType,
    }
  };

  grpc_client.recomend_step3(step_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step3);
    res.send(response.step3);
  });
})

app.post("/api/recommedation-system/step4", function (req, res) {
  const homeParams = req.body.homeParams;
  const step1Req = req.body.step1;
  const foundationType = req.body.step2.foundationType;
  const wallsMaterial = req.body.step3.wallsMaterial;

  const step_request = {
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
    step2: {
      foundationType: foundationType,
    },
    step3: {
      wallsMaterial: wallsMaterial,
    }
  };

  grpc_client.recomend_step4(step_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step4);
    res.send(response.step4);
  });
})

app.post("/api/recommedation-system/step5", function (req, res) {
  const homeParams = req.body.homeParams;
  const step1Req = req.body.step1;
  const foundationType = req.body.step2.foundationType;
  const wallsMaterial = req.body.step3.wallsMaterial;
  const step4Req = req.body.step4;

  const step_request = {
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
    step2: {
      foundationType: foundationType,
    },
    step3: {
      wallsMaterial: wallsMaterial,
    },
    step4: {
      slopesNumber: step4Req.slopesNumber,
      roofType: step4Req.roofType,
    }
  };

  grpc_client.recomend_step5(step_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step5);
    res.send(response.step5);
  });
})

app.post("/api/recommedation-system/step6", function (req, res) {
  const homeParams = req.body.homeParams;
  const step1Req = req.body.step1;
  const foundationType = req.body.step2.foundationType;
  const wallsMaterial = req.body.step3.wallsMaterial;
  const step4Req = req.body.step4;
  const step5Req = req.body.step5;

  const step_request = {
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
    step2: {
      foundationType: foundationType,
    },
    step3: {
      wallsMaterial: wallsMaterial,
    },
    step4: {
      slopesNumber: step4Req.slopesNumber,
      roofType: step4Req.roofType,
    },
    step5: {
      facadeTechnology: step5Req.facadeTechnology,
    }
  };

  grpc_client.recomend_step6(step_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step6);
    res.send(response.step6);
  });
})

app.post("/api/recommedation-system/step7", function (req, res) {
  const homeParams = req.body.homeParams;
  const step1Req = req.body.step1;
  const foundationType = req.body.step2.foundationType;
  const wallsMaterial = req.body.step3.wallsMaterial;
  const step4Req = req.body.step4;
  const step5Req = req.body.step5;
  const step6Req = req.body.step6;

  const step_request = {
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
    step2: {
      foundationType: foundationType,
    },
    step3: {
      wallsMaterial: wallsMaterial,
    },
    step4: {
      slopesNumber: step4Req.slopesNumber,
      roofType: step4Req.roofType,
    },
    step5: {
      facadeTechnology: step5Req.facadeTechnology,
    },
    step6: {
      windowMaterial: step6Req.windowMaterial,
      windowType: step6Req.windowType,
      doorMaterial: step6Req.doorMaterial,
    }
  };

  grpc_client.recomend_step7(step_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step7);
    res.send(response.step7);
  });
})

app.post("/api/recommedation-system/step8", function (req, res) {
  console.log(req.body)

  const homeParams = req.body.homeParams;
  const step1Req = req.body.step1;
  const foundationType = req.body.step2.foundationType;
  const wallsMaterial = req.body.step3.wallsMaterial;
  const step4Req = req.body.step4;
  const step5Req = req.body.step5;
  const step6Req = req.body.step6;
  const step7Req = req.body.step7;

  const step_request = {
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
      siteWorks: {
        cameras: step1Req.SiteWorks.cameras,
        temporaryFence: step1Req.SiteWorks.temporaryFence,
      },
      houseDesignAndProject: {
        homeProject: step1Req.HouseDesignAndProject.homeProject,
        designProject: step1Req.HouseDesignAndProject.designProject,
      }
    },
    step2: {
      foundationType: foundationType,
    },
    step3: {
      wallsMaterial: wallsMaterial,
    },
    step4: {
      slopesNumber: step4Req.slopesNumber,
      roofType: step4Req.roofType,
    },
    step5: {
      facadeTechnology: step5Req.facadeTechnology,
    },
    step6: {
      windowMaterial: step6Req.windowMaterial,
      windowType: step6Req.windowType,
      doorMaterial: step6Req.doorMaterial,
    },
    step7: {
      electrician: {
        plasticBoxesUpTo40mmWide: step7Req.electrician,
        layingAThreeToFive: step7Req.electrician,
        cableLaying: step7Req.electrician,
        installationOfTwoKey: step7Req.electrician,
        installationOfSingleKey: step7Req.electrician,
        recessedTypeSocketDevice: step7Req.electrician,
        installationOfPendant: step7Req.electrician,
        chandeliersAndPendants: step7Req.electrician,
      },
      waterSupply: {
        layingOfInternalWaterSupplyPipelines: step7Req.waterSupply,
        installationOfBathtubs: step7Req.waterSupply,
        installationOfSingle: step7Req.waterSupply,
        installationOfMixers: step7Req.waterSupply,
      },
      sewerage: {
        installationOfToilet: step7Req.sewerage,
        layingOfSewerage50mm: step7Req.sewerage,
        layingOfSewerage110mm: step7Req.sewerage,
      },
      heating: {
        assemblyOfAWaterSupply: step7Req.heating,
        layingOfInternalHeatingPipelines: step7Req.heating,
        installationOfWindowFixtures: step7Req.heating,
      },
      ventilation: {
        installationOfSplitSystems: step7Req.ventilation,
        cablingOnABrickWall: step7Req.ventilation,
      },
    }
  }

  grpc_client.recomend_step8(step_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step8);
    res.send(response.step8);
  });
})

app.post("/api/recommedation-system/step9", function (req, res) {
  const homeParams = req.body.homeParams;
  const step1Req = req.body.step1;
  const foundationType = req.body.step2.foundationType;
  const wallsMaterial = req.body.step3.wallsMaterial;
  const step4Req = req.body.step4;
  const step5Req = req.body.step5;
  const step6Req = req.body.step6;
  const step7Req = req.body.step7;
  const step8Req = req.body.step8;

  const step_request = {
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
      siteWorks: {
        cameras: step1Req.SiteWorks.cameras,
        temporaryFence: step1Req.SiteWorks.temporaryFence,
      },
      houseDesignAndProject: {
        homeProject: step1Req.HouseDesignAndProject.homeProject,
        designProject: step1Req.HouseDesignAndProject.designProject,
      }
    },
    step2: {
      foundationType: foundationType,
    },
    step3: {
      wallsMaterial: wallsMaterial,
    },
    step4: {
      slopesNumber: step4Req.slopesNumber,
      roofType: step4Req.roofType,
    },
    step5: {
      facadeTechnology: step5Req.facadeTechnology,
    },
    step6: {
      windowMaterial: step6Req.windowMaterial,
      windowType: step6Req.windowType,
      doorMaterial: step6Req.doorMaterial,
    },
    step7: {
      electrician: {
        plasticBoxesUpTo40mmWide: step7Req.electrician,
        layingAThreeToFive: step7Req.electrician,
        cableLaying: step7Req.electrician,
        installationOfTwoKey: step7Req.electrician,
        installationOfSingleKey: step7Req.electrician,
        recessedTypeSocketDevice: step7Req.electrician,
        installationOfPendant: step7Req.electrician,
        chandeliersAndPendants: step7Req.electrician,
      },
      waterSupply: {
        layingOfInternalWaterSupplyPipelines: step7Req.waterSupply,
        installationOfBathtubs: step7Req.waterSupply,
        installationOfSingle: step7Req.waterSupply,
        installationOfMixers: step7Req.waterSupply,
      },
      sewerage: {
        installationOfToilet: step7Req.sewerage,
        layingOfSewerage50mm: step7Req.sewerage,
        layingOfSewerage110mm: step7Req.sewerage,
      },
      heating: {
        assemblyOfAWaterSupply: step7Req.heating,
        layingOfInternalHeatingPipelines: step7Req.heating,
        installationOfWindowFixtures: step7Req.heating,
      },
      ventilation: {
        installationOfSplitSystems: step7Req.ventilation,
        cablingOnABrickWall: step7Req.ventilation,
      },
    },
    step8: {
      warmFloor: step8Req.warmFloor,
      ladderMaterial: step8Req.ladderMaterial,
    }
  };

  grpc_client.recomend_step9(step_request, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Response:', response.step9);
    res.send(response.step9);
  });
})

// начинаем прослушивать подключения на 8000 порту
app.listen(8000);
