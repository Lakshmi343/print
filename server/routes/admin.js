const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/upload', auth, upload.single('image'), adminController.uploadImage);

router.get('/settings', auth, adminController.getSettings);
router.put('/settings', auth, adminController.updateSettings);

router.get('/hero', auth, adminController.getHero);
router.put('/hero', auth, adminController.updateHero);

router.get('/newsletter', auth, adminController.getNewsletter);

router.get('/:entity', auth, adminController.getEntity);
router.post('/:entity', auth, adminController.createEntity);
router.put('/:entity/:id', auth, adminController.updateEntity);
router.delete('/:entity/:id', auth, adminController.deleteEntity);

module.exports = router;
