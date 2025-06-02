const { technicianService, serviceService } = require("../services");

const createTechnician = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const technicianData = req.body;
    const newTechnician = await technicianService.createTechnician(
      userId,
      technicianData
    );
    res.status(201).json({ technician: newTechnician });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTechnicianById = async (req, res) => {
  try {
    const technicianId = req.params.id;
    const technician = await technicianService.getTechnicianById(technicianId);
    if (!technician) {
      return res.status(404).json({ error: "Technician not found" });
    }
    res.status(200).json({ technician });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateTechnicianInfo = async (req, res) => {
  try {
    const technicianId = req.params.id;
    const technicianInfo = req.body;
    const updatedTechnician = await technicianService.updateTechnicianInfo(
      technicianId,
      technicianInfo
    );
    res.status(200).json({ technician: updatedTechnician });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteTechnician = async (req, res) => {
  try {
    const technicianId = req.params.id;
    await technicianService.deleteTechnician(technicianId);
    res.status(200).json({ message: "Technician deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTechnicians = async (req, res) => {
  try {
    const { technicians, totalTechnicians } =
      await technicianService.getAllTechnicians();
    res.status(200).json({ technicians, totalTechnicians });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTechniciansByService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const technicians = await serviceService.getTechniciansByService(
      serviceId
    );
    if (!technicians || technicians.length === 0) {
      return res
        .status(404)
        .json({ error: "No technicians found for this service" });
    }
    res.status(200).json({ technicians });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTechniciansByRates = async (req, res) => {
  try {
    const { minRate, maxRate } = req.query;
    if (minRate === undefined || maxRate === undefined) {
      return res.status(400).json({ error: "Min and Max rates are required" });
    }
    const { technicians, totalTechnicians } =
      await technicianService.getTechniciansByRates(
        parseFloat(minRate),
        parseFloat(maxRate)
      );
    if (!technicians || technicians.length === 0) {
      return res
        .status(404)
        .json({ error: "No technicians found in this rate range" });
    }
    res.status(200).json({ technicians, totalTechnicians });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTechnician,
  updateTechnicianInfo,
  deleteTechnician,
  getTechnicianById,
  getAllTechnicians,
  getTechniciansByService,
  getTechniciansByRates,
};
