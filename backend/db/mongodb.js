mongoose = require("mongoose");
const connectdatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connected to database");
    });
};

module.exports = connectdatabase;
