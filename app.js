var fs = require("node:fs");
var { join } = require("node:path");

module.exports.sendFile = async (client, par) => {
  var { req, res } = client;

  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  filePath = join(__dirname, "index.html");

  fs.readFile(filePath, (err, html) => {
    if (err) res.end("nopage");

    res.end(html);
  });
};
