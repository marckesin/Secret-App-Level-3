const express = require('express');
const md5 = require('md5');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', (req, res) => {
  res.render('register', { info: "" });
});

router.post('/', async (req, res, next) => {
  const user = new User({
    email: req.body.username,
    password: md5(req.body.password)
  });

  await User.countDocuments({ email: req.body.username }, (err, count) => {
    if (!err && count === 0) {
      user.validate({}, (err) => {
        if (!err) {
          user.save((err) => {
            if (!err) {
              res.render('secrets', { secret: user.password });
            }
          });
        } else {
          res.redirect('/register');
        }
      });
    } else {
      res.render('register', { info: 'Usuário já existe!' });
    }
  });
});

module.exports = router;
