const axios = require("axios");

const fetchNewHubSpotStudents = async (lastSyncTime) => {
  try {
    const response = await axios.post(
      `${process.env.HUBSPOT_BASE_URL}/crm/v3/objects/contacts/search`,
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
        properties: [
          "firstname",
          "lastname",
          "email",
          "phone",
          "course_name_via_deal",
          "batch_name",
          "course_fee_via_deal",
          "lastmodifieddate",
        ],
        limit: 100,
        sorts: [{ propertyName: "lastmodifieddate", direction: "ASCENDING" }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

const sendDataToHubspot = async (edmingleData) => {
  for (const data of edmingleData) {
    await axios.patch(
      `${process.env.HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${data.id}`,
      {
        properties: { batch_name: data.batchName, teacher: data.teacher },
      },
      { headers: { Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}` } }
    );
  }
};

module.exports = { fetchNewHubSpotStudents, sendDataToHubspot };
