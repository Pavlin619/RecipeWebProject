const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();


const createError = require("http-errors");
const favicon = require("serve-favicon");
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 8080;
const apiRouter = require("./api");

const { Server } = require("socket.io");
const io = new Server(server);

//Connect to db ---------------
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nqoas00.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to db...");
  }
);
//------------------------------------

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(express.static(path.join(__dirname, "assets")));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", apiRouter);

app.get("*", (req, res) => {
  if (req.url == "favicon.ico") return res.status(404).end();
  res.sendFile("index.html", { root: "public" });
});

//catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404);
  res.send(`<h1>Error 404: Resource not found</h1>`);
});

io.on("connection", (socket) => {
  connectedSockets = connectedSockets.concat(socket);
  socket.on("message", (message) => {
    for (const socket of connectedSockets) {
      socket.send(message);
    }
  });

  socket.on("disconnected", () => {
    connectedSockets = connectedSockets.filter(s => s !== socket);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
