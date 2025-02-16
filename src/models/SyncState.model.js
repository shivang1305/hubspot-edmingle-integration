const mongoose = require("mongoose");

const syncStateSchema = new mongoose.Schema({
  lastSycned: {
    type: Date,
    default: new Date("2024-01-01T00:00:00Z"),
  },
});

module.exports = mongoose.model("SyncState", syncStateSchema);
