import { socket } from '../../../client/src/services/socket.js';
import MessageModel from './socketHandler.js'

export default (io) => {
    io.on("connect",(socket) => {
        console.log(`User connected ${socket.id}`);
        
        io.emit("user_count",io.engine.clientsCount);

        socket.on("send_message",async (data) => {
            try {
                const {username, text} = data
                const saved = await Message.create({username, text})
                io.emit("received_message",saved)
                
            } catch (error) {
                  socket.emit("error_message", "Failed to send message");
            }
        })
    })
    socket.on("typing", (username) => {
        socket.broadcast.emit("user_typing",username);
    });
 
    socket.on("stop_typing",(username) => {
        socket.broadcast.emit("user_stopped_typing",username)
    })
    socket.on("disconnect", () => {
        console.log(`user disconnected ${socket.id}`);
        io.emit("user_count",io.engine.clientsCount)
        
    })
}