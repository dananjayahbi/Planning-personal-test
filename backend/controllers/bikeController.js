const Bike = require('../models/bike.model');
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

// Create Bike
const createBike = async (req, res) => {
    try {
        let imageUrls = [];
        if (req.files) {
            imageUrls = req.files.map(file => `/uploads/${req.folderName}/${file.filename}`);
        }

        const newBike = new Bike({
            imageUrls: imageUrls,
            description: req.body.description,
            price: req.body.price,
            mobileNo: req.body.mobileNo,
            location: req.body.location,
            status: req.body.status,
            favLevel: req.body.favLevel
        });

        const savedBike = await newBike.save();
        res.status(201).json(savedBike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Bikes
const getBikes = async (req, res) => {
    try {
        const bikes = await Bike.find();
        res.status(200).json(bikes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Bike by ID
const getBikeById = async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);
        res.status(200).json(bike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Bike by ID
const updateBike = async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);
        if (!bike) {
            return res.status(404).json({ message: 'Bike AD not found' });
        }

        // Update fields if provided
        if (req.body.description) bike.description = req.body.description;
        if (req.body.price) bike.price = req.body.price;
        if (req.body.mobileNo) bike.mobileNo = req.body.mobileNo;
        if (req.body.location) bike.location = req.body.location;
        if (req.body.status) bike.status = req.body.status;
        if (req.body.favLevel) bike.favLevel = req.body.favLevel;

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

            bike.imageUrls = bike.imageUrls.concat(newImageUrls);
        }

        const updatedBike = await bike.save();
        res.status(200).json(updatedBike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Bike by ID
const deleteBike = async (req, res) => {
    try {
        const deletedBike = await Bike.findByIdAndDelete(req.params.id);
        if (deletedBike) {
            res.status(200).json({ message: 'Bike AD deleted successfully' });
        } else {
            res.status(404).json({ message: 'Bike AD not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBike,
    getBikes,
    getBikeById,
    updateBike,
    deleteBike,
    upload
};