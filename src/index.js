const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
// const logger = require("./config/logger");

let server;

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log("Connected to MongoDB");
    server = app.listen(config.port, () => {
      console.log(`Listening to port ${config.port}`);
    });
  })
  .catch((error) => console.log(`Connecton failed ${error}`));

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");

      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
