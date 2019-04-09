const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authenticationRouter = require('./routes/authentication-router')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth/', authenticationRouter);

module.exports = server