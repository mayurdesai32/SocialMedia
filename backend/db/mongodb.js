mongoose = require("mongoose");
const connectdatabase = () => {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("connected to database");
  });
};

module.exports = connectdatabase;
