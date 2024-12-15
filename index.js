var http = require("http");
var { home } = require("./router/home");
var { addMethods } = require("./router/services/resMethods");

var me = { name: "jura", age: 22 };

var routing = {
  "/*": (client, par) => home(client, par),
  "/user": () => me,
  "/user/age": () => me.age,
  "/user/name": () => me.name,
  //"/user/*": (client, par) => home(client, par),
};

var types = {
  string: (s) => s,
  number: (n) => n + "",
  undefined: () => "not found",
  object: (obj) => JSON.stringify(obj),
  function: (fn, par, client) => fn(client, par),
};

var matching = [];
for (key in routing) {
  if (key.indexOf("*") !== -1) {
    var rx = new RegExp(key.replace("*", "(.*)"));
    matching.push([rx, routing[key]]);
    delete routing[key];
  }
}

var router = async (client) => {
  var par,
    rx,
    route = routing[client.req.url];

  if (route === undefined) {
    for (var i = 0, len = matching.length; i < len; i++) {
      rx = matching[i];

      par = client.req.url.match(rx[0]);

      if (par) {
        par.shift();
        route = matching[i][1];
        break;
      }
    }
  }
  var renderer = types[typeof route];

  return renderer(route, par, client);
};

http
  .createServer(async (req, res) => {
    res = await addMethods(res);

    await router({ req, res });
  })
  .listen(8000, "127.0.0.1", console.log("server run"));
