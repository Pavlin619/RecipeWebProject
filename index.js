const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
require('dotenv').config();

const createError = require("http-errors");
const favicon = require("serve-favicon");
const app = express();
const port = 8080;
const apiRouter = require("./api");

//Connect to db ---------------
const url=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nqoas00.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("connected to db...");
})
//------------------------------------

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(express.static(path.join(__dirname, "assets")));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", apiRouter);

app.get("*", (req, res) => {
  if (req.url == 'favicon.ico') return res.status(404).end();
  res.sendFile(path.resolve("./index.html"))
})

//catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404);
  res.send(`<h1>Error 404: Resource not found</h1>`);
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
