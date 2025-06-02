const express = require("express");
const allRoutes = require("./v1");

const router = express.Router();

const defaultRoutes = [
  {
    path: "",
    route: allRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
