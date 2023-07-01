require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
