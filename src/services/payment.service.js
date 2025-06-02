const { Payment } = require("../models");

const createPayment = async (paymentData) => {
  const { bookingId, amount, method, transactionId, status, user } = paymentData;

  // Create the payment
  const newPayment = await Payment.create({
    bookingId,
    amount,
    method,
    transactionId,
    status,
    user
  });
  return newPayment;
};

const getPaymentById = async (id) => {
  const payment = await Payment.findById(id);
  return payment;
};

const updatePaymentInfo = async (paymentId, paymentInfo) => {
  const { bookingId, amount, method, transactionId, status } = paymentInfo;
  const updatedPayment = await Payment.findByIdAndUpdate(
    paymentId,
    {
      bookingId,
      amount,
      method,
      transactionId,
      status,
    },
    { new: true }
  );
  return updatedPayment;
};

const deletePayment = async (paymentId) => {
  const deletedPayment = await Payment.findByIdAndDelete(paymentId);
  return deletedPayment;
};

const getAllPayments = async () => {
  const payments = await Payment.find();
  const totalPayments = await Payment.countDocuments();
  return { payments, totalPayments };
};

const getAllUserPayments = async (userId) => {
  const payments = await Payment.find({ user: userId });
  const totalPayments = await Payment.countDocuments({ user: userId });
  return { payments, totalPayments };
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePaymentInfo,
  deletePayment,
  getAllPayments,
  getAllUserPayments,
};
