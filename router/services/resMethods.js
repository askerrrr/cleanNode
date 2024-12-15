var { readFile } = require("node:fs");

var sendFile = async (res, path) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  readFile(path, (e, file) => {
    if (e) throw e;

    res.end(file);
  });
};

module.exports.addMethods = async (res) => {
  res.sendFile = sendFile.bind(null, res);

  return res;
};
