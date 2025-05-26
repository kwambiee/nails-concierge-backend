const { Service } = require("../models");

const createService = async (serviceData) => {
  const {
    name,
    description,
    price,
    duration,
    category,
    image,
    professional,
  } = serviceData;
  
  // Create the service
  const newService = await Service.create({
    name,
    description,
    price,
    duration,
    category,
    image,
    professional,
  });
  return newService;
};

const getServiceById = async (id) => {
  const service = await Service.findById(id);
  return service;
};

const updateServiceInfo = async (serviceId, serviceInfo) => {
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
  } = serviceInfo;
  const updatedService = await Service.findByIdAndUpdate(
    serviceId,
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
  return updatedService;
};

const deleteService = async (serviceId) => {
  const deletedService = await Service.findByIdAndDelete(serviceId);
  return deletedService;
}

const getTechnicianServices = async (professionalId) => {
  const services = await Service.find({ professional: professionalId });
  const totalServices = await Service.countDocuments({ professional: professionalId });
  return { services, totalServices };
}
const getAllServices = async () => {
  const services = await Service.find();
  const totalServices = await Service.countDocuments();
  return { services, totalServices };
};

module.exports = {
  createService,
  getServiceById,
  updateServiceInfo,
  deleteService,
  getTechnicianServices,
  getAllServices,
};
