// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// const authMiddleware = require('../middlewares/authMiddleware');
// const adminMiddleware = require('../middlewares/adminMiddleware'); // Middleware to check admin privileges

// // Protected routes (require authentication and admin role)
// router.use(authMiddleware.authenticateToken);
// router.use(adminMiddleware.verifyAdmin);

router.get('/users', adminController.getAllUsers);
router.get('/reports', adminController.getReports);
router.delete('/users/:id', adminController.removeUser);
router.put('/users/:id/ban', adminController.banUser);
router.get('/borrow-stats', adminController.getBorrowStats);

module.exports = router;
