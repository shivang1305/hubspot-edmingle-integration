const axios = require("axios");
const SyncState = require("../models/SyncState.model.js");

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_BASE_URL = process.env.HUBSPOT_BASE_URL;

const fetchStudentsFromHubspot = async () => {
  const lastSync = await SyncState.findOne({});
  const lastSyncTime = lastSync
    ? lastSync.lastSycned.toISOString
    : "2024-01-01T00:00:00Z";

  const reponse = await axios.get(
    `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`,
    {
      headers: { Authorization: `Bearer ${HUBSPOT_API_KEY}` },
    }
  );

  return reponse.data.results;
};

const sendDataToHubspot = async (edmingleData) => {
  for (const data of edmingleData) {
    await axios.patch(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${data.id}`,
      {
        properties: { batch_name: data.batchName, teacher: data.teacher },
      },
      { headers: { Authorization: `Bearer ${HUBSPOT_API_KEY}` } }
    );
  }
};

module.exports = { fetchStudentsFromHubspot, sendDataToHubspot };
