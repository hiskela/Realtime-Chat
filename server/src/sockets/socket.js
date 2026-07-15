let io;

const onlineUsers = new Map();

const initializeSocket = (socketServer) => {
  io = socketServer;

  io.on("connection", (socket) => {
    socket.on("setup", (userId) => {
      if (!userId) return;

      onlineUsers.set(userId, socket.id);

      socket.join(userId);

      io.emit("online-users", [...onlineUsers.keys()]);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit("online-users", [...onlineUsers.keys()]);
    });
  });
};

export const getIO = () => io;

export const getOnlineUsers = () => onlineUsers;

export default initializeSocket;