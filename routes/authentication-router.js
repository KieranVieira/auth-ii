const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
    try {
        let user = req.body;
        user.password = bcrypt.hashSync(user.password, 12);

        db('users')
            .insert(user)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Bad request, Could not register.',
                    error
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Server could not register user",
            error
        })
    }
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    db('users')
        .where({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome, ${user.name}`,
                    token
                })
            }else{
                res.status(400).json({
                    message: "Wrong username or password. Unauthorized"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could not log you in",
                error
            })
        })
})

router.get('/users', (req, res) => {
    res.send('this is a route')
})

module.exports = router;