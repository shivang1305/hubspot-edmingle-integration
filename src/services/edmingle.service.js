const axios = require("axios");

const EDMINGLE_API_KEY = process.env.EDMINGLE_API_KEY;
const EDMINGLE_BASE_URL = process.env.EDMINGLE_BASE_URL;

const fetchEdmingleData = async () => {
  const response = await axios.get(`${EDMINGLE_BASE_URL}/batches`, {
    headers: { Authorization: `Bearer ${EDMINGLE_API_KEY}` },
  });

  return response.data;
};

const sendStudentsToEdmingle = async (hubspotStudents) => {
  for (const student of hubspotStudents) {
    // UPDATE the student record
    await axios.post(
      `${EDMINGLE_BASE_URL}/organization/students`,
      {
        name: student.properties.firstame,
        email: student.properties.email,
        contact_number: student.properties.phone,
      },
      {
        headers: { Authorization: `Bearer ${EDMINGLE_API_KEY}` },
      }
    );
  }

  // Update last sync timestamp
  await SyncState.updateOne({}, { lastSynced: new Date() }, { upsert: true });

  console.log("New students synced to Edmingle.");
};

module.exports = { fetchEdmingleData, sendStudentsToEdmingle };
