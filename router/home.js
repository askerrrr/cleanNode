var { join } = require("node:path");

var home = async (client, par) => {
  var { req, res } = client;
  console.log(req.url);

  switch (req.url) {
    case "/":
      var path = join(__dirname, "../public", "index.html");
      res.sendFile(path);
      break;
    case "/asker":
      var path = join(__dirname, "../public", "asker.html");
      res.sendFile(path);
  }
};

module.exports.home = home;
