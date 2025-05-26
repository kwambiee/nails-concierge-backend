const { Client } = require("../models");

const createClient = async (userId, clientData) => {
  const { reviews, favorites, loyaltyPoints, referralCode } = clientData;
  // Check if the user already exists
  const existingClient = await Client.findOne({ userId });
  if (existingClient) {
    throw new Error("Client already exists");
  }
  // Create the client
  const newClient = await Client.create({
    userId,
    reviews,
    favorites,
    loyaltyPoints,
    referralCode,
  });
  return newClient;
};

const getClientById = async (id) => {
  const client = await Client.findById(id).populate("userId");
  return client;
};

const updateClientInfo = async (clientId, clientInfo) => {
  const { reviews, favorites, loyaltyPoints, referralCode } = clientInfo;
  const updatedClient = await Client.findByIdAndUpdate(
    clientId,
    { reviews, favorites, loyaltyPoints, referralCode },
    { new: true }
  );
  return updatedClient;
};

const deleteClient = async (clientId) => {
  const deletedClient = await Client.findByIdAndDelete(clientId);
  return deletedClient;
};

const getAllClients = async () => {
  const clients = await Client.find().populate("userId");
  const totalClients = await Client.countDocuments();
  return { clients, totalClients };
};

const getClientFavoriteService = async (clientId) => {
  const client = await Client.findById(clientId).populate("favorites");
  if (!client) {
    throw new Error("Client not found");
  }
  return client.favorites;
};



module.exports = {
  createClient,
  getClientById,
  updateClientInfo,
  deleteClient,
  getAllClients,
  getClientFavoriteService
};
