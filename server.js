const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//const { createAdapter } = require('@socket.io/redis-adapter');

// Redis clients
//const pubClient = createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
//const subClient = pubClient.duplicate();

// Socket.IO server
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Handle "sent_product" event
  socket.on('sent_product', (data) => {
    console.log('Order received:', data);
    io.emit('new_order', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
