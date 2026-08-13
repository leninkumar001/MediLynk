import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to MediLynk AI Backend 🚀"
    });
});

// API Routes
app.use("/api/auth", authRoutes);

export default app;