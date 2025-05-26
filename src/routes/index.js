const express = require("express");
const allRoutes = require("./v1");

const router = express.Router();

const defaultRoutes = [
  {
    path: "",
    route: allRoutes,
  },
];

console.log("routes/index.js reached")

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
