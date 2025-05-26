const { Earning } = require("../models");

const createEarning = async (earningData) => {
  const { userId, amount, currency, date, service, booking, payments } =
    earningData;

  // Create the earning
  const newEarning = await Earning.create({
    userId,
    amount,
    currency,
    date,
    service,
    booking,
    payments,
  });
  return newEarning;
};

const getEarningById = async (id) => {
  const earning = await Earning.findById(id);
  return earning;
};

const updateEarningInfo = async (earningId, earningInfo) => {
  const { userId, amount, currency, date, service, booking, payments } =
    earningInfo;
  const updatedEarning = await Earning.findByIdAndUpdate(
    earningId,
    {
      userId,
      amount,
      currency,
      date,
      service,
      booking,
      payments,
    },
    { new: true }
  );
  return updatedEarning;
};

const deleteEarning = async (earningId) => {
  const deletedEarning = await Earning.findByIdAndDelete(earningId);
  return deletedEarning;
};

const getTechnicianEarnings = async (userId) => {
  const earnings = await Earning.aggregate([
    {
      $match: { userId: userId },
    },
    {
      $lookup: {
        from: "services",
        localField: "service",
        foreignField: "_id",
        as: "serviceDetails",
      },
    },
    {
      $lookup: {
        from: "bookings",
        localField: "booking",
        foreignField: "_id",
        as: "bookingDetails",
      },
    },
    {
      $lookup: {
        from: "payments",
        localField: "payments",
        foreignField: "_id",
        as: "paymentDetails",
      },
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        amount: 1,
        currency: 1,
        date: 1,
        service: { $arrayElemAt: ["$serviceDetails.name", 0] },
        booking: { $arrayElemAt: ["$bookingDetails.bookingId", 0] },
        payments: { $arrayElemAt: ["$paymentDetails.paymentMethod", 0] },
      },
    },
    // total earnings
    {
      $group: {
        _id: "$userId",
        totalEarnings: { $sum: "$amount" },
        earnings: { $push: "$$ROOT" },
      },
    },
  ]);

  return earnings.length > 0 ? earnings[0] : { totalEarnings: 0, earnings: [] };
};

const getAllEarnings = async () => {
  const earnings = await Earning.find()
    .populate("userId", "name email")
    .populate("service", "name")
    .populate("booking", "bookingId")
    .populate("payments", "paymentMethod");

  const totalEarnings = await Earning.countDocuments();
  return { earnings, totalEarnings };
};
const getEarningsByTechnician = async (technicianId) => {
  const earnings = await Earning.find({ userId: technicianId })
    .populate("service", "name")
    .populate("booking", "bookingId")
    .populate("payments", "paymentMethod");

  return earnings;
};

module.exports = {
  createEarning,
  getEarningById,
  updateEarningInfo,
  deleteEarning,
  getAllEarnings,
  getTechnicianEarnings,
  getEarningsByTechnician,
};
