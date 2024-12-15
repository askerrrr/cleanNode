var { join } = require("node:path");

var home = async (client, par) => {
  var { req, res } = client;

  var path = join(__dirname, "../index.html");

  res.sendFile(path);
};

module.exports.home = home;
