const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.dbURL)
  .then(() => app.listen(process.env.PORT || 3000, () => console.log("DB Connected server running on port 3000")))
  .catch((err) => console.log(err));

// Routes
const noteRoutes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");

app.use(authRoutes); // Public auth routes
app.use(noteRoutes); // Protected note routes