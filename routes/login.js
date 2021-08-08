const express = require('express');
const md5 = require('md5');
const User = require('../models/user.model');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', { info: "" });
});

router.post('/', async (req, res) => {
    await User.findOne({ email: req.body.username, password: md5(req.body.password) }, (err, result) => {
        if (!err && result) {
            res.render('secrets', { secret: result.password });
        } else {
            res.render('login', { info: "Email ou senha inválidos!" });
        }
    });
});

module.exports = router;
