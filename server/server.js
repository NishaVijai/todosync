// server/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import todoRoutes from "./routes/todoRoutes.js"; // note .js extension

dotenv.config();

const app = express();

// ===== Middleware =====

// Environment-aware CORS: allow localhost for dev & your Netlify frontend in prod
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL, // e.g., "https://your-netlify-app.netlify.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman or server requests
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

// ===== MongoDB Connection =====
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));


// ===== Routes =====
app.use("/api/todos", todoRoutes);

// ===== Test route =====
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
