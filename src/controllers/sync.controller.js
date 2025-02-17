const SyncState = require("../models/SyncState.model");
const {
  fetchEdmingleData,
  sendStudentsToEdmingle,
} = require("../services/edmingle.service");
const {
  sendDataToHubspot,
  fetchNewHubSpotStudents,
} = require("../services/hubspot.service");

const syncEdmingleToHubspot = async (_, res) => {
  try {
    const edmingleData = await fetchEdmingleData();
    await sendDataToHubspot(edmingleData);
    res.status(200).json({ message: "Synced Edmingle data to Hubspot" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const syncHubspotToEdmingle = async (_, res) => {
  let lastSync = await SyncState.findOne();

  if (!lastSync) {
    console.log("🔹 First-time sync detected. Initializing lastSynced...");
    lastSync = await SyncState.create({
      lastSynced: new Date("2024-01-01T00:00:00Z"),
    });
  }

  const lastSyncTime = lastSync
    ? lastSync.lastSynced.toISOString()
    : "2024-01-01T00:00:00Z";

  try {
    const newHubspotStudents = await fetchNewHubSpotStudents(lastSyncTime);

    if (newHubspotStudents.length === 0) {
      console.log("No new students to sync.");
      res.status(200).json({ message: "No data to be synced" });
    }
    // await sendStudentsToEdmingle(newHubspotStudents);

    // res.status(200).json({ message: "Synced Hubspot data to Edmingle" });

    res.status(200).json({ newStudentsData: newHubspotStudents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { syncEdmingleToHubspot, syncHubspotToEdmingle };
