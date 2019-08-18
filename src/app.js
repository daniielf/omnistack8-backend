const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const config = require('./config')

mongoose.connect(`mongodb+srv://${config.username}:${config.password}@omnistackcluster-kudsu.mongodb.net/tindev_users?retryWrites=true&w=majority`, { useNewUrlParser: true });

server.use(express.json());
server.use(cors());
server.use(routes);
server.listen(3333);