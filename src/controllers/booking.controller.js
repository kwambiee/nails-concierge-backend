const { bookingService } = require("../services");

const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const newBooking = await bookingService.createBooking(bookingData);
    res.status(201).json({ booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateBookingInfo = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const bookingInfo = req.body;
    const updatedBooking = await bookingService.updateBookingInfo(
      bookingId,
      bookingInfo
    );
    res.status(200).json({ booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    await bookingService.deleteBooking(bookingId);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTechnicianBookings = async (req, res) => {
  try {
    const professionalId = req.params.id;
    const { bookings, totalBookings } =
      await bookingService.getTechnicianBookings(professionalId);
    res.status(200).json({ bookings, totalBookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClientBookings = async (req, res) => {
  try {
    const clientId = req.user._id;
    if (!clientId) {
      return res.status(400).json({ error: "Client ID is required" });
    }
    const { bookings, totalBookings } = await bookingService.getClientBookings(
      clientId
    );
    res.status(200).json({ bookings, totalBookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const { bookings, totalBookings } = await bookingService.getAllBookings();
    res.status(200).json({ bookings, totalBookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  updateBookingProfile,
  deleteBooking,
  getBookingById,
  getTechnicianBookings,
  updateBookingInfo,
  getClientBookings,
  getAllBookings,
};
