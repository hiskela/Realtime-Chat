import User from "../models/User.js";

let io;

const onlineUsers = new Map();

const initializeSocket = (socketServer) => {
  io = socketServer;

  io.on("connection", (socket) => {
    socket.on("setup", async (userId) => {
      if (!userId) return;

      onlineUsers.set(userId, socket.id);

      await User.findByIdAndUpdate(userId, {
        status: "online",
      });

      socket.join(userId);

      io.emit("online-users", [...onlineUsers.keys()]);
    });

    socket.on("disconnect", async () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);

          await User.findByIdAndUpdate(userId, {
            status: "offline",
            lastSeen: new Date(),
          });

          break;
        }
      }

      io.emit("online-users", [...onlineUsers.keys()]);
    });
  });
};

export const getIO = () => io;

export default initializeSocket;
