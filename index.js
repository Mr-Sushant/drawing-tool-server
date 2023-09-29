const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");
const cors = require("cors");



const app = express();
const FRONTEND_URL = app.settings.env === 'development' ? 'http://localhost:3000':'https://drawconnect.vercel.app/';
app.use(cors({origin: FRONTEND_URL}));
const httpServer = createServer(app);
const io = new Server(httpServer,{ cors: FRONTEND_URL });


io.on("connection", (socket) =>{
    console.log("connection setup");

    socket.on("beginPath", (arg) => {
        socket.broadcast.emit("beginPath",arg);
    });

    socket.on("drawLine", (arg) => {
        socket.broadcast.emit("drawLine",arg);
    });

    socket.on("changeConfig",(arg) => {
        socket.broadcast.emit("changeConfig",arg);
    });

    socket.on("menuItemClick",(arg) => {
        socket.broadcast.emit("menuItemClick",arg);
    });

    socket.on("actionItemClick",(arg) => {
        socket.broadcast.emit("actionItemClick",arg);
    });
});

httpServer.listen(5000);