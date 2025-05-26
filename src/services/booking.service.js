const { Booking } = require("../models");

const createBooking = async (bookingData) => {
  const {
    client,
    professional,
    address,
    date,
    service,
    status,
    paymentStatus,
    notes,
    feedback,
    cancellationReason,
    rescheduleReason,
    rescheduleDate,
    rescheduleTime,
    rescheduleStatus,
  } = bookingData;

  // Create the booking
  const newBooking = await Booking.create({
    client,
    professional,
    address,
    date,
    service,
    status,
    paymentStatus,
    notes,
    feedback,
    cancellationReason,
    rescheduleReason,
    rescheduleDate,
    rescheduleTime,
    rescheduleStatus,
  });
  return newBooking;
};

const getBookingById = async (id) => {
  const booking = await Booking.findById(id);
  return booking;
};

const updateBookingInfo = async (bookingId, bookingInfo) => {
  const {
    client,
    professional,
    address,
    date,
    service,
    status,
    paymentStatus,
    notes,
    feedback,
    cancellationReason,
    rescheduleReason,
    rescheduleDate,
    rescheduleTime,
    rescheduleStatus,
  } = bookingInfo;
  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      client,
      professional,
      address,
      date,
      service,
      status,
      paymentStatus,
      notes,
      feedback,
      cancellationReason,
      rescheduleReason,
      rescheduleDate,
      rescheduleTime,
      rescheduleStatus,
    },
    { new: true }
  );
  return updatedBooking;
};

const deleteBooking = async (bookingId) => {
  const deletedBooking = await Booking.findByIdAndDelete(bookingId);
  return deletedBooking;
};

const getTechnicianBookings = async (professionalId) => {
  const bookings = await Booking.find({ professional: professionalId })
    .populate("client")
    .populate("service");
  const totalBookings = await Booking.countDocuments({
    professional: professionalId,
  });
  return { bookings, totalBookings };
};
const getClientBookings = async (clientId) => {
  const bookings = await Booking.find({ client: clientId })
    .populate("professional")
    .populate("service");
  const totalBookings = await Booking.countDocuments({ client: clientId });
  return { bookings, totalBookings };
};

const getAllBookings = async () => {
  const bookings = await Booking.find()
    .populate("client")
    .populate("professional")
    .populate("service");
  const totalBookings = await Booking.countDocuments();
  return { bookings, totalBookings };
};

module.exports = {
  createBooking,
  getBookingById,
  updateBookingInfo,
  deleteBooking,
  getTechnicianBookings,
  getClientBookings,
  getAllBookings,
};
