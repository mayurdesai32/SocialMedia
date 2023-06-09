const multer = require("multer");

const storage = multer.memoryStorage();
console.log("hello world bvfdgfdg");
const singleUpload = multer({ storage }).single("file");

module.exports = singleUpload;
