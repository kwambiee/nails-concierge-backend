const { clientService } = require("../services");

const createClient = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const clientData = req.body;
    const newClient = await clientService.createClient(
      userId,
      clientData
    );
    res.status(201).json({ client: newClient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await clientService.getClientById(clientId);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json({ client });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateClientInfo = async (req, res) => {
  try {
    const clientId = req.params.id;
    const clientInfo = req.body;
    const updatedClient = await clientService.updateClientInfo(
      clientId,
      clientInfo
    );
    res.status(200).json({ client: updatedClient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    await clientService.deleteClient(clientId);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllClients = async (req, res) => {
  try {
    const { clients, totalClients } =
      await clientService.getAllClients();
    res.status(200).json({ clients, totalClients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClientFavoriteService = async (req, res) => {
  try {
    const clientId = req.params.id;
    const favoriteServices = await clientService.getClientFavoriteService(
      clientId
    );
    if (!favoriteServices) {
      return res.status(404).json({ error: "No favorite services found" });
    }
    res.status(200).json({ favoriteServices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createClient,
  updateClientInfo,
  deleteClient,
  getClientById,
  getAllClients,
  getClientFavoriteService,
};
