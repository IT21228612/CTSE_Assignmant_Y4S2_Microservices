require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Routers
const itemRouter = require("./Routes/ItemRoute");

// Middleware
app.use(express.json());
app.use(cors()); // You can restrict origins here if needed

// Health check route
app.get("/", (req, res) => {
  res.send("Home Inventory API is running!");
});

// API Routes
app.use("/api/items", itemRouter);

// Configuration
const rawPort = process.env.PORT2;
const PORT = parseInt(rawPort, 10) || 5001;
const MONGO_URL = process.env.MONGO_URL;
const DEV_MODE = process.env.DEV_MODE || "development";

// Validate PORT
if (isNaN(PORT) || PORT <= 0 || PORT >= 65536) {
  console.error(`❌ Invalid PORT: "${rawPort}". Must be between 1 and 65535.`);
  process.exit(1);
}

// Enable strictQuery mode (optional for cleaner query behavior)
mongoose.set("strictQuery", true);

// MongoDB Connection and Server Start
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running in ${DEV_MODE} mode on port ${PORT}`);
    });
    

    server.on("error", (err) => {
      console.error("❌ Server failed to start:", err.message);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
