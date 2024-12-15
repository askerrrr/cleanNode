var { readFile } = require("node:fs");
var { join } = require("node:path");

var home = async (client, par) => {
  var { req, res } = client;

  var filePath = join(__dirname, "../index.html");

  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  readFile(filePath, (e, html) => {
    if (e) throw e;

    res.end(html);
  });
};

module.exports.home = home;
