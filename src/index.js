import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});
io.on("connection", (socket) => {});


const port = process.env.PORT || 3000;
httpServer.listen(port, () => { console.log(`Server listening to port ${port}`) });