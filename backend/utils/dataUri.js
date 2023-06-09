const DataUriParser = require("datauri/parser.js");

const path = require("path");

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();

  return parser.format(extName, file.buffer);
  //   const parser = new DataUriParser();
  //   return (dataUri = parser.format(".png", file.buffer));
};

module.exports = getDataUri;
