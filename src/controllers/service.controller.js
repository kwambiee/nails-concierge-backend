const { serviceService } = require("../services");

const createService = async (req, res) => {
  try {
    const serviceData = req.body;
    const newService = await serviceService.createService(serviceData);
    res.status(201).json({ service: newService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await serviceService.getServiceById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json({ service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateServiceInfo = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const serviceInfo = req.body;
    const updatedService = await serviceService.updateServiceInfo(
      serviceId,
      serviceInfo
    );
    res.status(200).json({ service: updatedService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    await serviceService.deleteService(serviceId);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTechnicianServices = async (req, res) => {
  try {
    const { services, totalServices } = await serviceService.getAllServices();
    res.status(200).json({ services, totalServices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const { services, totalServices } =
      await serviceService.getTechnicianServices();
    res.status(200).json({ services, totalServices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createService,
  updateServiceInfo,
  deleteService,
  getServiceById,
  getAllServices,
  getTechnicianServices,
};
