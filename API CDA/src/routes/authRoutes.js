const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/login', authController.login);         // POST
router.get('/me', authController.getProfile);        // GET
router.put('/password', authController.updatePassword); // PUT
router.delete('/logout', authController.logout);     // DELETE

module.exports = router;