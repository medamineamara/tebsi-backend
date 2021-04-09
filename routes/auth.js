const express = require ('express');
const router = express.Router();
require('dotenv').config();
const path = require('path');

const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    // Read username and password from request body
    const { username, password } = req.body;

    const user = {
        username : process.env.username,
        password : process.env.password
    };

    const accessTokenSecret = process.env.accessTokenSecret;

    if (user.username === username && user.password === password) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, 
             { expiresIn: '1h' });

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});

module.exports = router;