require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const connectdatabase = require("./db/mongodb");

const errorMiddleware = require("./error_handler/errorMiddleware");
// all routes

const user_routes = require("./routes/user_routes");

// CONFIGURATION

PORT = process.env.PORT || 8000;
ENV = process.env.NODE_ENV || "DEVELOPMENT";

// file storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

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

app.use("/asserts", express.static(path.join(__dirname, "public/assets")));

// all routes

app.use("/api/user", user_routes);

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
