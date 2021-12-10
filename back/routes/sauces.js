const express = require('express');
const router = express.Router();

const saucesController = require('../controllers/sauces');

// Add a new sauce to the app
router.post('/', saucesController.createSauce);

// Get one sauce from the app
router.get('/:id', saucesController.getOneSauce);

// Get all the sauces from the app
router.get('/', saucesController.getAllSauces);

// Update a sauce from the app
router.put('/:id', saucesController.updateSauce);

// Delete a sauce from the app
router.delete('/:id', saucesController.deleteSauce);

module.exports = router;
