const routes = require("next-routes")();

routes.add("/", "/home/index").add("signal", "/signal/:id/:tabName");

module.exports = routes;
