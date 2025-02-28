const axios = require("axios");

const fetchEdmingleData = async () => {
  const response = await axios.get(`${EDMINGLE_BASE_URL}/batches`, {
    headers: { Authorization: `Bearer ${EDMINGLE_API_KEY}` },
  });

  return response.data;
};

const sendStudentsToEdmingle = async (hubspotStudents) => {
  for (const student of hubspotStudents) {
    const { email, firstname, lastname, phone } = student.properties;
    const name = firstname + lastname;

    // check that student already exist or not
    // Search student api
    // TODO: this api needs to work properly in postman first
    const studentRecord = await axios.get(
      `${process.env.EDMINGLE_BASE_URL}/student/search`,
      {
        institution_id: process.env.EDMINGLE_INSTITUTION_ID,
        student_email: email,
      },
      {
        headers: {
          apikey: process.env.EDMINGLE_API_KEY,
        },
      }
    );

    if (studentRecord.status === 200) {
      // UPDATE the student record
      await axios.post(
        `${process.env.EDMINGLE_BASE_URL}/organization/students`,
        {
          name: name,
          email: email,
          contact_number: phone,
        },
        {
          headers: { Authorization: `Bearer ${process.env.EDMINGLE_API_KEY}` },
        }
      );
    } else {
      // CREATE the student record
      await axios.post(
        `${process.env.EDMINGLE_BASE_URL}/organization/students`,
        {
          JSONString: {
            emails: [
              {
                contact_number_country_id: 103,
                contact_number_dial_code: "+91",
                email: email,
                name: name,
                organization_id: process.env.EDMINGLE_ORGANIZATION_ID,
                contact_number: phone,
              },
            ],
          },
        }
      );
    }
  }

  // Update last sync timestamp
  await SyncState.updateOne({}, { lastSynced: new Date() }, { upsert: true });

  console.log("New students synced to Edmingle.");
};

module.exports = { fetchEdmingleData, sendStudentsToEdmingle };
