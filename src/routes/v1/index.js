const express = require("express");
const authRoute = require("./auth.route");

const router = express.Router();
const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
];

console.log("routes/v1/index.js reached");

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;