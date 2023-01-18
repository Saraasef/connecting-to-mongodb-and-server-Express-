const express = require("express");
const path = require("path");
// const router = require("./routers/router");
const { AllRouters } = require("./routers/router");

module.exports = class Application {
  #app = express();
  #PORT;
  #DB_URL;
  constructor(PORT, DB_URL) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.ConfigApplication();
    this.ConnectToMongoDb();
    this.CreateServer();
    this.CreateRoutes();
    this.ErrorHandler();
  }

  ConfigApplication() {
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }

  CreateServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log(`server listening to the port ` + this.#PORT);
    });
  }

  ConnectToMongoDb() {
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", false);
    mongoose.connect(this.#DB_URL, (error) => {
      if (error) throw error;
      return console.log("conected to db successfuly ...");
    });
  }

  CreateRoutes() {
    this.#app.get("/", (req, res, next) => {
      return res.json({ message: "Welcome to my app" });
    });
  }

  ErrorHandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "the page was not found",
      });
    });
    this.#app.use((error, req, res, next) => {
      const status = error?.status || 500;
      const message = error?.message || "an internal server errror";
      return res.status(status).json({ status, success: false, message });
    });
  }

  createRoutes() {
    this.#app.use(AllRouters);
    // this.#app.get("/", (req, res, next) => {
    //   return res.json({ message: "Welcome to my app" });
    // });
  }
};
