const axios = require("axios");

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_BASE_URL = process.env.HUBSPOT_BASE_URL;

const fetchNewHubSpotStudents = async (lastSyncTime) => {
  const response = await axios.post(
    `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/search`,
    {
      filterGroups: [
        {
          filters: [
            {
              propertyName: "lastmodifieddate",
              operator: "GT", // Greater Than
              value: new Date(lastSyncTime).getTime(), // Convert date to timestamp
            },
          ],
        },
      ],
      properties: ["firstname", "lastname", "email", "lastmodifieddate"],
      limit: 100,
      sorts: [{ propertyName: "lastmodifieddate", direction: "ASCENDING" }],
    },
    {
      headers: {
        Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.results;
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

module.exports = { fetchNewHubSpotStudents, sendDataToHubspot };
