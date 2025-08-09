// routes/ratingRoutes.js

const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
// const authMiddleware = require('../middlewares/authMiddleware');

// // Protected routes (require authentication)
// router.use(authMiddleware.authenticateToken);

router.post('/rate', ratingController.rateBorrow);
router.post('/report', ratingController.reportIssue);

// Public routes
router.get('/resource/:id', ratingController.getResourceRatings);
router.get('/:id', ratingController.getRatingsByResource)
module.exports = router;