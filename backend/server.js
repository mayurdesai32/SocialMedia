require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");

const connectdatabase = require("./db/mongodb");
const errorMiddleware = require("./error_handler/errorMiddleware");

const user_routes = require("./routes/user_routes");
const post_routes = require("./routes/post_routes");
// CONFIGURATION

PORT = process.env.PORT || 8000;
ENV = process.env.NODE_ENV || "DEVELOPMENT";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// for handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to uncaught Exception`);
  process.exit(1);
});

// connencting database

connectdatabase();

// all middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(cors());

// all routes

app.use("/api/user", user_routes);
app.use("/api/post", post_routes);

// Error Middleware
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT} AND IN ${ENV} MODE`);
});

// For unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
