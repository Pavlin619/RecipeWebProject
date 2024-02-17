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
const http = require("http");
const server = http.createServer(app);
const port = 8080;
const apiRouter = require("./api");

const { Server } = require("socket.io");
const io = new Server(server);

let connectedSockets = [];

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
  console.log("A client connected");
  connectedSockets.push(socket);
  socket.on("comment", (comment) => {
    console.log("Received new comment:", comment);

    io.emit("commentUpdated", updatedData);
  });

  socket.on("disconnected", () => {
    console.log("A client disconnected");
    connectedSockets = connectedSockets.filter((s) => s !== socket);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
