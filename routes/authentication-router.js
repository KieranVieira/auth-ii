const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig');

const router = express.Router();

const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1d',
    }

    jwt.sign(payload, secret, options)

}

router.post('/register', (req, res) => {
    res.send('this is a route')
})

router.post('/login', (req, res) => {
    res.send('this is a route')
})

router.get('/users', (req, res) => {
    res.send('this is a route')
})

module.exports = router;