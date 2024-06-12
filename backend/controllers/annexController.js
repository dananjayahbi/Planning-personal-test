const Annex = require('../models/annex.model'); // Adjust path as needed
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Generate a unique folder for each request
const generateFolderName = () => {
    return uuidv4();
};

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!req.folderName) {
            req.folderName = generateFolderName();
        }
        const uploadDir = path.join(__dirname, '..', 'uploads', req.folderName);
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Create Annex
const createAnnex = async (req, res) => {
    try {
        let imageUrls = [];
        if (req.files) {
            imageUrls = req.files.map(file => `/uploads/${req.folderName}/${file.filename}`);
        }

        const newAnnex = new Annex({
            imageUrls: imageUrls,
            description: req.body.description,
            price: req.body.price,
            mobileNo: req.body.mobileNo,
            location: req.body.location,
            status: req.body.status,
            annexToCampusDistance: req.body.annexToCampusDistance,
            annexToColomboDistance: req.body.annexToColomboDistance,
            annexToBattaramullaDistance: req.body.annexToBattaramullaDistance,
            favLevel: req.body.favLevel
        });

        const savedAnnex = await newAnnex.save();
        res.status(201).json(savedAnnex);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Annexes
const getAnnexes = async (req, res) => {
    try {
        const annexes = await Annex.find();
        res.status(200).json(annexes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Annex
const getAnnex = async (req, res) => {
    try {
        const annex = await Annex.findById(req.params.id);
        res.status(200).json(annex);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an Annex
const deleteAnnex = async (req, res) => {
    try {
        const deletedAnnex = await Annex.findByIdAndDelete(req.params.id);
        if (deletedAnnex) {
            res.status(200).json({ message: 'Annex deleted successfully' });
        } else {
            res.status(404).json({ message: 'Annex not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an Annex
const updateAnnex = async (req, res) => {
    try {
        const annex = await Annex.findById(req.params.id);
        if (!annex) {
            return res.status(404).json({ message: 'Annex not found' });
        }

        // Update fields if provided
        if (req.body.description) annex.description = req.body.description;
        if (req.body.price) annex.price = req.body.price;
        if (req.body.mobileNo) annex.mobileNo = req.body.mobileNo;
        if (req.body.location) annex.location = req.body.location;
        if (req.body.status) annex.status = req.body.status;
        if (req.body.annexToCampusDistance) annex.annexToCampusDistance = req.body.annexToCampusDistance;
        if (req.body.annexToColomboDistance) annex.annexToColomboDistance = req.body.annexToColomboDistance;
        if (req.body.annexToBattaramullaDistance) annex.annexToBattaramullaDistance = req.body.annexToBattaramullaDistance;
        if (req.body.favLevel) annex.favLevel = req.body.favLevel;

        // Handle additional image uploads
        if (req.files && req.files.length > 0) {
            const newFolderName = generateFolderName();
            const uploadDir = path.join(__dirname, '..', 'uploads', newFolderName);
            fs.mkdirSync(uploadDir, { recursive: true });

            const newImageUrls = req.files.map(file => {
                const newPath = path.join(uploadDir, file.originalname);
                fs.renameSync(file.path, newPath);
                return `/uploads/${newFolderName}/${file.originalname}`;
            });

            annex.imageUrls = annex.imageUrls.concat(newImageUrls);
        }

        const updatedAnnex = await annex.save();
        res.status(200).json(updatedAnnex);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    upload,
    createAnnex,
    getAnnexes,
    getAnnex,
    deleteAnnex,
    updateAnnex
};
