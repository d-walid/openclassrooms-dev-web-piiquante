const express = require("express");
const router = express.Router();

const saucesController = require("../controllers/sauces");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Add a new sauce to the app
router.post("/", auth, multer, saucesController.createSauce);

// Get one sauce from the app
router.get("/:id", auth, saucesController.getOneSauce);

// Get all the sauces from the app
router.get("/", auth, saucesController.getAllSauces);

// Update a sauce from the app
router.put("/:id", auth, saucesController.updateSauce);

// Delete a sauce from the app
router.delete("/:id", auth, saucesController.deleteSauce);

module.exports = router;
