let io;

 const initializeSocket = (socketServer) => {
  io = socketServer;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO is not initialized.");
  }

  return io;
};
export default initializeSocket;