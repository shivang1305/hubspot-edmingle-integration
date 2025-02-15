const express = require("express");
const dotenv = require("dotenv");
const sync = require("./src/routes/sync.routes.js");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/sync", sync);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
