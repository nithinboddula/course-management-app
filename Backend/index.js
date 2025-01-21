const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes.js");
const cors = require("cors"); //Cross-Origin Resource Sharing.

const app = express(); // express instance
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json()); // parses incoming requests with JSON.

// Connect to MongoDB.
mongoose
  .connect(
    "mongodb+srv://nithinboddula29:SzCBeepJGN8svyCV@cluster0.j4svy.mongodb.net/Captico"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/routes", apiRoutes);

//starting the Express server.
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
