const { earningService } = require("../services");

const createEarning = async (req, res) => {
  try {
    const earningData = req.body;
    const newEarning = await earningService.createEarning(earningData);
    res.status(201).json({ earning: newEarning });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEarningById = async (req, res) => {
  try {
    const earningId = req.params.id;
    const earning = await earningService.getEarningById(earningId);
    if (!earning) {
      return res.status(404).json({ error: "Earning not found" });
    }
    res.status(200).json({ earning });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateEarningInfo = async (req, res) => {
  try {
    const earningId = req.params.id;
    const earningInfo = req.body;
    const updatedEarning = await earningService.updateEarningInfo(
      earningId,
      earningInfo
    );
    res.status(200).json({ earning: updatedEarning });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteEarning = async (req, res) => {
  try {
    const earningId = req.params.id;
    await earningService.deleteEarning(earningId);
    res.status(200).json({ message: "Earning deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllEarnings = async (req, res) => {
  try {
    const { earnings, totalEarnings } = await earningService.getAllEarnings();
    res.status(200).json({ earnings, totalEarnings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTechnicianEarnings = async (req, res) => {
  try {
    const technicianId = req.user._id;
    if (!technicianId) {
      return res.status(400).json({ error: "Technician ID is required" });
    }
    const { earnings, totalEarnings } =
      await earningService.getTechnicianEarnings(technicianId);
    res.status(200).json({ earnings, totalEarnings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEarning,
  updateEarningInfo,
  deleteEarning,
  getEarningById,
  getAllEarnings,
  getTechnicianEarnings,
};
