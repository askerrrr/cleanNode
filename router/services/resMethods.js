var fs = require("node:fs");

var sendFile = async (path) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  fs.readFile(path, (e, file) => {
    if (e) throw e;

    res.end(file);
  });
};

var addMethods = async (res) => {};
