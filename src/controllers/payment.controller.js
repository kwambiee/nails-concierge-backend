const { paymentService } = require("../services");

const createPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const newPayment = await paymentService.createPayment(paymentData);
    res.status(201).json({ payment: newPayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await paymentService.getPaymentById(paymentId);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updatePaymentInfo = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const paymentInfo = req.body;
    const updatedPayment = await paymentService.updatePaymentInfo(
      paymentId,
      paymentInfo
    );
    res.status(200).json({ payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    await paymentService.deletePayment(paymentId);
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const {payments, totalPayments} = await paymentService.getAllPayments();
    res.status(200).json({ payments, totalPayments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPayment,
  updatePaymentInfo,
  deletePayment,
  getPaymentById,
  getAllPayments,
};
