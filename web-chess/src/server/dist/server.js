"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
    pingInterval: 10000,
    pingTimeout: 5000,
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('move', (data) => {
        try {
            socket.broadcast.emit('move', data);
        }
        catch (error) {
            console.error('Error handling move:', error);
        }
    });
    socket.on('reset', () => {
        try {
            socket.broadcast.emit('reset');
        }
        catch (error) {
            console.error('Error handling reset:', error);
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
