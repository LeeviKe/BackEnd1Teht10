/* eslint-disable new-cap */

const express = require('express');
const UserController = require('../controllers/usercontroller');
const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.authenticateUser);

module.exports = router;
