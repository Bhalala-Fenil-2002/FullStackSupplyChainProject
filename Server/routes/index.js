var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
let AUTH = require('../model/users');
const jwt = require('jsonwebtoken');
let authorization = require('../middleware/authentication');


// Sign-Up 
router.post('/signup', async function (req, res, next) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    userData = await AUTH.create(req.body);
    res.status(200).json({
      status: 200,
      message: "Thank you for registering."
    });
  } catch (error) {
    res.status(404).json({
      status: 400,
      message: error.message,
    });
  }
});

// Sign-In
router.post('/signin', async function (req, res, next) {
  try {
    let loginUserData = await AUTH.findOne({ email: req.body.email });
    let pass = await bcrypt.compare(req.body.password, loginUserData.password);
    if (!pass) {
      throw new Error('password is not valid.');  
    }
    const token = await jwt.sign({ id: loginUserData._id }, "auth_session_id", { expiresIn: '1h', algorithm: 'HS256' });
    res.status(200).json({
      status: 200,
      token: token
    });
  } catch (error) {
    res.status(404).json({
      status: 400,
      message: error.message,
    });
  }
});

// Home
router.get('/home', authorization.Authentication, async function (req, res, next) {
  try {
    res.status(200).json({
      status: 200,
      message: req.user
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
});

module.exports = router;