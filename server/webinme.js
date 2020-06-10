const express = require("express");
const config = require("./config");


const regRouter = require("./routers/reg");
const loginRouter = require("./routers/login");
const sitesRouter = require("./routers/sites");
const apiRouter = require("./routers/api");
const image = require("./routers/image");
const deleteSiteRouter = require("./routers/deleteSite");
const editSiteRouter = require("./routers/editSite");
const info = require("./routers/info");

const app = express();
app.use(express.json({limit: '5mb'}));
require('./mongoose');


//routers
app.use(regRouter);
app.use(loginRouter);
app.use(sitesRouter);
app.use(apiRouter);
app.use(image);
app.use(deleteSiteRouter);
app.use(editSiteRouter);
app.use(info);



app.listen(config.port, function(){
  console.log(`Start on port ${config.port}`);
});
