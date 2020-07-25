const express = require("express");
const config = require("./config");
const path = require('path');

const regRouter = require("./routers/reg");
const loginRouter = require("./routers/login");
const sitesRouter = require("./routers/sites");
const apiRouter = require("./routers/api");
const image = require("./routers/image");
const deleteSiteRouter = require("./routers/deleteSite");
const editSiteRouter = require("./routers/editSite");
const mail = require("./routers/mail");
const info = require("./routers/info");
const admin = require("./routers/admin");
const logout = require("./routers/logout");
const cookieParser = require('cookie-parser');
const getIp = require("./middleware/getUserIp")

const app = express();
app.use(express.json({limit: '5mb'}));
app.use(express.static(path.join(__dirname, './client/build')));

app.use(cookieParser())

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
app.use(admin);
app.use(mail);
app.use(logout);

app.get("/*", getIp, function(req, res){
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.listen(config.port, function(){
  console.log(`Start on port ${config.port}`);
});
