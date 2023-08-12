// подключение express
const express = require("express");
const {appendFile, readFileSync} = require("fs");
const cors = require("cors");
// создаем объект приложения
const app = express();
app.use(cors())

app.get("/regions", function (request, response) {
  const content = readFileSync("./base/regions.json","utf8");
  const regions = JSON.parse(content);
  response.send(regions);
});

// начинаем прослушивать подключения на 8000 порту
app.listen(8000);
