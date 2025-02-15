const express = require("express");
const {
  syncEdmingleToHubspot,
  syncHubspotToEdmingle,
} = require("../controllers/sync.controller");

const router = express.Router();

router.post("/edmingle-to-hubspot", syncEdmingleToHubspot);
router.post("/hubspot-to-edmingle", syncHubspotToEdmingle);

module.exports = router;
