"use strict";

const express = require('express');

const routes = express.Router();

routes.get('/atendimentos', (req, res) => {
    res.sendStatus(200);
});

module.exports = routes;