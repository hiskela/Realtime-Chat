const onlineUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Register user after login
    socket.on("setup", (userId) => {
      if (!userId) return;

      onlineUsers.set(userId, socket.id);

      socket.join(userId);

      io.emit("online-users", [...onlineUsers.keys()]);

      console.log(`User ${userId} is online`);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit("online-users", [...onlineUsers.keys()]);

      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};

export default socketHandler;