const express=require('express');
const path=require('path');
const bodyParser = require("body-parser");
const logger=require("morgan");
const cookieParser=require('cookie-parser');

const createError=require('http-errors');
const favicon=require('serve-favicon');
const app=express();
const port=8080;
const apiRouter = require("./api");

app.use(express.static(path.join(__dirname,'public')));
app.use(favicon(path.join(__dirname, 'public','favicon.ico')));
app.use(express.static(path.join(__dirname,'src')));

app.use(logger('dev'));
app.use("/", apiRouter);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//render HTML files
app.engine('html', require('ejs').renderFile)

//catch 404 and forward to error handler
app.use((req,res)=>{
    res.status(404);
    res.send(`<h1>Error 404: Resource not found</h1>`)
});

app.listen(port,()=>{
    console.log(`Server is listening on port: ${port}`);
});