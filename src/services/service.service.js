const { Service } = require("../models");

const createService = async (serviceData) => {
  const { name, description, price, duration, category, image, technician } =
    serviceData;
  
  // Create the service
  const newService = await Service.create({
    name,
    description,
    price,
    duration,
    category,
    image,
    technician,
  });
  return newService;
};

const getServiceById = async (id) => {
  const service = await Service.findById(id);
  return service;
};

const updateServiceInfo = async (serviceId, serviceInfo) => {
  const { name, description, price, duration, category, image, technician } =
    serviceInfo;
  const updatedService = await Service.findByIdAndUpdate(
    serviceId,
    {
      name,
      description,
      price,
      duration,
      category,
      image,
      technician,
    },
    { new: true }
  );
  return updatedService;
};

const deleteService = async (serviceId) => {
  const deletedService = await Service.findByIdAndDelete(serviceId);
  return deletedService;
}

const getTechnicianServices = async (technician) => {
  const services = await Service.find(technician);
  const totalServices = await Service.countDocuments(technician);
  return { services, totalServices };
}
const getAllServices = async () => {
  const services = await Service.find();
  const totalServices = await Service.countDocuments();
  return { services, totalServices };
};

const getTechniciansByService = async (serviceId) => {
  const technicians = await Service.aggregate([
    {
      $match: { _id: serviceId }
    },
    {
      $lookup: {
        from: "technicians",
        localField: "technician",
        foreignField: "_id",
        as: "technicians"
      }
    },
    {
      $unwind: "$technicians"
    },
    {
      $project: {
        _id: 0,
        technicianId: "$technicians._id",
        name: "$technicians.name",
        bio: "$technicians.bio",
        rating: "$technicians.rating",
        services: "$technicians.services",
        availability: "$technicians.availability",
        workingHours: "$technicians.workingHours",
        earnings: "$technicians.earnings",
        isVerified: "$technicians.isVerified"
      }
    }
  ]);
  if (!technicians || technicians.length === 0) {
    throw new Error("No technicians found for the specified service");
  }
  const totalTechnicians = technicians.length;
  return { technicians, totalTechnicians };
  
};

module.exports = {
  createService,
  getServiceById,
  updateServiceInfo,
  deleteService,
  getTechnicianServices,
  getAllServices,
  getTechniciansByService,
};
