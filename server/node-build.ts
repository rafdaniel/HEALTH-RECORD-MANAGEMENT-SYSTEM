import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer } from "./index"; // Imports your app setup
import db from "./database/connection"; // Import the database pool

const app = createServer();
const port = process.env.PORT || 3000;

// In production, serve the built SPA files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../spa");

// 1. Serve static files (e.g., /assets/index.js)
app.use(express.static(distPath));

// 2. Handle SPA routes (e.g., /dashboard, /profile)
// This is the LAST route, so it only catches requests that
// were NOT handled by your API routes or the static file server.
app.use((req, res, next) => {
  // Only handle GET requests for client-side routing
  if (req.method !== "GET") return next();

  // Don't serve index.html for API routes
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return next();
  }

  res.sendFile(path.join(distPath, "index.html"));
});

// Start the server
const server = app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// --- Enhanced Graceful Shutdown ---

const gracefulShutdown = () => {
  console.log("🛑 Shutting down gracefully...");
  
  // 1. Stop the server from accepting new connections
  server.close(async (err) => {
    if (err) {
      console.error("Error during server close:", err);
      process.exit(1);
    }

    // 2. Close the database pool
    try {
      await db.end();
      console.log("Database pool closed.");
    } catch (dbErr) {
      console.error("Error closing database pool:", dbErr);
    }
    
    // 3. Exit the process
    console.log("Shutdown complete.");
    process.exit(0);
  });
};

// Listen for shutdown signals
process.on("SIGTERM", gracefulShutdown); // For 'kill' commands
process.on("SIGINT", gracefulShutdown);  // For Ctrl+C