const express = require('express');
const noteController = require('../controllers/noteController');
const authorization = require('../middlewares/authorization');

const router = express.Router();

router.get('/notes/', authorization, noteController.index);
router.post('/notes/', authorization, noteController.create);
router.get('/notes/:id', authorization, noteController.show);
router.put('/notes/:id', authorization, noteController.update);
router.delete('/notes/:id', authorization, noteController.destroy);

module.exports = router;