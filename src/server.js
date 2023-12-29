const express = require("express");
const cors = require("cors");
const modules = require("./modules/app.module.js");
const { serverPort } = require("./config/index.js");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static("uploads"));

app.use("/api", modules.router);

app.listen(serverPort, () => {
  console.log(`http://localhost:${serverPort}`);
});
