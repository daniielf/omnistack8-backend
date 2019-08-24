const express = require('express');
const routes = require('./routes');

const mongoose = require('mongoose');

const cors = require('cors');
const httpServer = express();
const server = require('http').Server(httpServer);
const socket = require('socket.io')(server);

const connections = {};

socket.on('connection', socket => {
    // console.log('New Connection:', socket.id);
    connections[socket.handshake.query.user_id] = socket.id
    console.log(connections);
});

const config = require('./config');
mongoose.connect(`mongodb+srv://${config.username}:${config.password}@omnistackcluster-kudsu.mongodb.net/tindev_users?retryWrites=true&w=majority`, { useNewUrlParser: true });

httpServer.use((req, res, next) => {
    req.socket = socket;
    req.connections = connections;
    return next();
});

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);

server.listen(3333);
