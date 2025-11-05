import { createServer } from "./index";
import db from "./database/connection";

const app = createServer();
const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
  console.log(`💾 Database: ${process.env.DB_NAME || 'healthcare_db'}`);
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("\n🛑 Shutting down gracefully...");
  
  server.close(async (err) => {
    if (err) {
      console.error("Error during server close:", err);
      process.exit(1);
    }

    try {
      await db.end();
      console.log("Database pool closed.");
    } catch (dbErr) {
      console.error("Error closing database pool:", dbErr);
    }
    
    console.log("Shutdown complete.");
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);