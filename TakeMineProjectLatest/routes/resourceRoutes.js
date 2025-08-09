// routes/resourceRoutes.js

const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
// const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/search', resourceController.searchResources);
router.get('/:id', resourceController.getResourceDetails);

// // Protected routes (require authentication)
// router.use(authMiddleware.authenticateToken);
router.get('/search/:id', resourceController.searchResourcesByTUID);
router.post('/', resourceController.addResource);
router.put('/:id', resourceController.editResource);
router.delete('/:id', resourceController.deleteResource);

module.exports = router;
