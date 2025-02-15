const {
  fetchEdmingleData,
  sendStudentsToEdmingle,
} = require("../services/edmingle.service");
const {
  sendDataToHubspot,
  fetchStudentsFromHubspot,
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

const syncHubspotToEdmingle = async (req, res) => {
  try {
    const hubspotStudents = await fetchStudentsFromHubspot();
    await sendStudentsToEdmingle(hubspotStudents);

    res.status(200).json({ message: "Synced Hubspot data to Edmingle" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { syncEdmingleToHubspot, syncHubspotToEdmingle };
