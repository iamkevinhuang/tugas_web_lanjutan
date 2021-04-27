const express = require('express');
const userController = require('../controllers/userController');
const authorization = require('../middlewares/authorization');

const router = express.Router();

router.get('/users/current', authorization, userController.show);
router.patch('/users/current', authorization, userController.update);

module.exports = router;