const express = require('express');
const authorizationController = require('../controllers/authorizationController');

const router = express.Router();

router.post('/authorization/login', authorizationController.login);
router.post('/authorization/register', authorizationController.register);

module.exports = router;