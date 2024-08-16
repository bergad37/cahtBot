import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from "path";


dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});
io.on("connection", (socket) => {});


app.use(express.static('src'));

io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected`);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/index.html'));
});
io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected`);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('message', (data) => {
        //sends the data to everyone except you.
        // socket.broadcast.emit('response', data);

        //sends the data to everyone connected to the server
        socket.emit("response", data)
    });
})

const port = process.env.PORT;
httpServer.listen(port, () => { console.log(`Server listening to port ${port}`) });