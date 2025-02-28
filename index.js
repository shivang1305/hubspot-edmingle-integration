const express = require("express");
const dotenv = require("dotenv");
const sync = require("./src/routes/sync.routes.js");
const connectDB = require("./src/db/config.js");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/sync", sync);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
