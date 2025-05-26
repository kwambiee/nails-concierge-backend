const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const bookingRoute = require("./booking.route");
const serviceRoute = require("./service.route");
const clientRoute = require("./client.route");
const technicianRoute = require("./technician.route");
const reviewRoute = require("./review.route");
const earningRoute = require("./earning.route");
const paymentRoute = require("./payment.route");
const notificationRoute = require("./notification.route");

const router = express.Router();
const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
