const express = require('express');
const router = express.Router();
const { upload, createBike, getBikes, getBikeById, deleteBike, updateBike } = require('../controllers/bikeController');

// Create Bike
router.post('/create', upload.array('images', 10), createBike);

// Get all Bikes
router.get('/getAllBikes', getBikes);

// Get a single Bike by ID
router.get('/getBikeById/:id', getBikeById);

// Delete a Bike by ID
router.delete('/deleteBike/:id', deleteBike);

// Update a Bike by ID
router.put('/updateBike/:id', upload.array('images', 10), updateBike);

module.exports = router;