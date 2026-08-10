import MessageModel from '../models/message.model.js'

export default  (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

   
    io.emit("user_count", io.engine.clientsCount);

    socket.on("send_message", async (data) => {
      try {
        const { username, text } = data;
        const saved = await MessageModel.create({ username, text });
        io.emit("receive_message", saved); 
      } catch (err) {
        socket.emit("error_message", "Failed to send message");
      }
    });

    
    socket.on("typing", (username) => {
      socket.broadcast.emit("user_typing", username);
    });
    socket.on("stop_typing", () => {
      socket.broadcast.emit("user_stopped_typing");
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      io.emit("user_count", io.engine.clientsCount);
    });
  });
};