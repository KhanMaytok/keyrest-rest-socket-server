const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

// Import CORS middleware
const cors = require("cors");

// Enable CORS for Express routes
app.use(
  cors({
    origin: "*", // Allow requests from this origin
    methods: ["GET", "POST"],         // Allowed HTTP methods
    credentials: true                 // Allow cookies/credentials
  })
);

// Socket.IO server with CORS config
const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from this origin
    methods: ["GET", "POST"],        // Allowed HTTP methods
    credentials: true                // Allow cookies/credentials
  }
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("send_to_kitchen", (data) => {
    console.log("Order received:", data);
    io.emit("new_order_detail", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Basic Express route
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
