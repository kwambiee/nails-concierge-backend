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
  {
    path: "/bookings",
    route: bookingRoute,
  },
  {
    path: "/services",
    route: serviceRoute,
  },
  {
    path: "/clients",
    route: clientRoute,
  },
  {
    path: "/technicians",
    route: technicianRoute,
  },
  {
    path: "/reviews",
    route: reviewRoute,
  },
  {
    path: "/earnings",
    route: earningRoute,
  },
  {
    path: "/payments",
    route: paymentRoute,
  },
  {
    path: "/notifications",
    route: notificationRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
