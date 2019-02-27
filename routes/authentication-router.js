const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

const router = express.Router();

const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

const restricted = (req,res,next) => {
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                res.status(401).json({
                    message: "You arent authorized to do this"
                })
            }else{
                req.decodedJwt = decodedToken;
                next();
            }
        })
    }else{
        res.status(400).json({
            message: "Bad request, please provide token in authorization headers"
        })
    }
}

const checkDepartment = (req,res,next) => {
    if(req.decodedJwt.department === 'finance'){
        req.department = 'finance'
        next();
    }else if(req.decodedJwt.department === 'sales'){
        req.department = 'sales'
        next();
    }else{
        res.status(403).json({
            message: "You are not in a department, contact your administrator"
        })
    }
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

router.get('/users', restricted, checkDepartment, (req, res) => {
    db('users')
        .where({department: req.department})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could not get user data",
                error
            })
        })
})

module.exports = router;