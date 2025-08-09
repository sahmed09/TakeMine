// routes/borrowRoutes.js

const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
// const authMiddleware = require('../middlewares/authMiddleware');

// // Protected routes (require authentication)
// router.use(authMiddleware.authenticateToken);

router.post('/request', borrowController.requestBorrow);
router.put('/:id/approve', borrowController.approveBorrowRequest);
router.put('/:id/started', borrowController.startedBorrowRequest);
router.put('/:id/complete', borrowController.completeBorrow);
router.get('/history/:resourceId', borrowController.getBorrowHistory);
router.get('/searchpending/:userId', borrowController.getAllPendingBorrowsByTUID);
module.exports = router;
