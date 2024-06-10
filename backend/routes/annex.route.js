const express = require('express');
const router = express.Router();
const { upload, createAnnex, getAnnexes, getAnnex, deleteAnnex, updateAnnex } = require('../controllers/annexController');

// Create Annex
router.post('/create', upload.array('images', 10), createAnnex);

// Get all Annexes
router.get('/getAllAnnexes', getAnnexes);

// Get a single Annex by ID
router.get('/getAnnexById/:id', getAnnex);

// Delete an Annex by ID
router.delete('/deleteAnnex/:id', deleteAnnex);

// Update an Annex by ID
router.put('/updateAnnex/:id', upload.array('images', 10), updateAnnex);

module.exports = router;
