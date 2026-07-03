const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/ServiceController');

router.get('/', serviceController.getAll);       
router.get('/:id', serviceController.getById);   
router.post('/', serviceController.create);      
router.put('/:id', serviceController.update);    
router.delete('/:id', serviceController.delete); 

module.exports = router;