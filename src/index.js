"use strict";

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes/routes');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(helmet());
server.use(routes);

server.listen(5555, () => {
  console.log('Server Running');
});

module.exports = server;