const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.post('/newsletter', publicController.subscribeNewsletter);
router.get('/home', publicController.getHome);

module.exports = router;
