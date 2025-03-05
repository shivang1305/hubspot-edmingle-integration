const cron = require("node-cron");
const {
  syncHubspotToEdmingle,
  syncEdmingleToHubspot,
} = require("../controllers/sync.controller");

// ✅ Run the function immediately on startup
(async () => {
  console.log("⏳ Running First-Time Sync...");
  // await syncHubSpotToEdmingle();
  // await syncEdmingleToHubspot();
  console.log("✅ First-Time Sync Completed!");
})();

cron.schedule("*/1 * * * *", async () => {
  console.log("⏳ Running HubSpot → Edmingle Sync...");
  //   await syncHubspotToEdmingle();
  //   await syncHubspotToEdmingle();
  console.log("✅ Sync Completed!");
});

// Keep the process running
console.log("🔄 Cron Job Started!");
