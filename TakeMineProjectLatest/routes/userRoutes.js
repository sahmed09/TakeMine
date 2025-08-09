// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.authenticateUser);
router.post('/reset-password', userController.resetPassword);

// // Protected routes (require authentication)
// router.use(authMiddleware.authenticateToken);

router.get('/profile/:id', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.get('/balance', userController.getMyBalance);




module.exports = router;
