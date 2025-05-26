const { Technician } = require("../models");

const createTechnician = async (userId, technicianData) => {
  const {
    bio,
    rating,
    services,
    bookings,
    notifications,
    availability,
    workingHours,
    earnings,
    isVerified,
  } = technicianData;
  // Check if the user already exists
  const existingTechnician = await Technician.findOne({ userId });
  if (existingTechnician) {
    throw new Error("Technician already exists");
  }
  // Create the technician
  const newTechnician = await Technician.create({
    userId,
    bio,
    rating,
    services,
    bookings,
    notifications,
    availability,
    workingHours,
    earnings,
    isVerified,
  });
  return newTechnician;
};

const getTechnicianById = async (id) => {
  const technician = await Technician.findById(id).populate("userId");
  return technician;
};


const updateTechnicianInfo = async (technicianId, technicianInfo) => {
  const {
    bio,
    rating,
    services,
    bookings,
    notifications,
    availability,
    workingHours,
    earnings,
    isVerified,
  } = technicianInfo;
  const updatedTechnician = await Technician.findByIdAndUpdate(
    technicianId,
    {
      bio,
      rating,
      services,
      bookings,
      notifications,
      availability,
      workingHours,
      earnings,
      isVerified,
    },
    { new: true }
  );
  return updatedTechnician;
};

const deleteTechnician = async (technicianId) => {
  const deletedTechnician = await Technician.findByIdAndDelete(technicianId);
  if (!deletedTechnician) {
    throw new Error("Technician not found");
  }
  return deletedTechnician;
}

const getAllTechnicians = async () => {
  const technicians = await Technician.find().populate("userId");
  const totalTechnicians = await Technician.countDocuments();
  return { technicians, totalTechnicians };
};

const getTechniciansByService = async (serviceId) => {
  const technicians = await Technician.aggregate([
    {
      $unwind: "$services"
    },
    {
      $match: { services: serviceId }
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails"
      }
    },
    {
      $unwind: "$userDetails"
    },
    {
      $project: {
        _id: 1,
        userId: "$userDetails._id",
        name: "$userDetails.name",
        email: "$userDetails.email",
        bio: 1,
        rating: 1,
        services: 1,
        bookings: 1,
        notifications: 1,
        availability: 1,
        workingHours: 1,
        earnings: 1,
        isVerified: 1
      }
    }
  ]);
  if (!technicians || technicians.length === 0) {
    throw new Error("No technicians found for the specified service");
  }
  const totalTechnicians = technicians.length;
  return { technicians, totalTechnicians };
  
};

const getTechniciansByRates = async (minRating, maxRating) => {
  const technicians = await Technician.find({
    rating: { $gte: minRating, $lte: maxRating },
  }).populate("userId");

  if (!technicians || technicians.length === 0) {
    throw new Error("No technicians found within the specified rating range");
  }

  const totalTechnicians = technicians.length;
  return { technicians, totalTechnicians };
};

module.exports = {
  createTechnician,
  getTechnicianById,
  updateTechnicianInfo,
  deleteTechnician,
  getTechniciansByService,
  getAllTechnicians,
  getTechniciansByRates,
};
