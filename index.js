const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./src/config/db");

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "https://afghan.ayancurtains.com",  // Allow requests from this domain
    "https://admin.afghan.ayancurtains.com"  // Allow requests from this subdomain
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // You can customize allowed methods
  credentials: true,  // Enable sending credentials (cookies, authorization headers, etc.)
};

// Use CORS middleware with options
app.use(cors(corsOptions));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB(); 

// Routes
const admin = require("./src/routes/adminRoutes");
const visit = require("./src/routes/visitRoutes");
const Event = require("./src/routes/eventRoutes");

app.use("/api/user", admin);
app.use("/api/visit", visit);
app.use("/api/event", Event);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message || "Server Error" });
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
