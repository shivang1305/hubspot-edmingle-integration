const cron = require("node-cron");
const { syncHubspotToEdmingle } = require("../controllers/sync.controller");

cron.schedule("*/1 * * * *", async () => {
  console.log("⏳ Running HubSpot → Edmingle Sync...");
  await syncHubspotToEdmingle();
  console.log("✅ Sync Completed!");
});

// Keep the process running
console.log("🔄 Cron Job Started!");
