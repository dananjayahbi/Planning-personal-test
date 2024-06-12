const Job = require("../models/job.model");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

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
    const uploadDir = path.join(__dirname, "..", "uploads", req.folderName);
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create Job
const createJob = async (req, res) => {
  try {
    let imageUrls = [];
    let responsesUrls = [];
    if (req.files) {
      imageUrls = req.files.map(
        (file) => `/uploads/${req.folderName}/${file.filename}`
      );
    }

    const newJob = new Job({
      imageUrls: imageUrls,
      jobTitle: req.body.jobTitle,
      description: req.body.description,
      status: req.body.status,
      responsesTxt: req.body.responsesTxt,
      favLevel: req.body.favLevel,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Job by ID
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Update fields if provided
    if (req.body.jobTitle) job.jobTitle = req.body.jobTitle;
    if (req.body.description) job.description = req.body.description;
    if (req.body.status) job.status = req.body.status;
    if (req.body.responsesTxt) job.responsesTxt = req.body.responsesTxt;
    if (req.body.favLevel) job.favLevel = req.body.favLevel;

    // Handle additional image uploads
    if (req.files && req.files.length > 0) {
      const newFolderName = generateFolderName();
      const uploadDir = path.join(__dirname, "..", "uploads", newFolderName);
      fs.mkdirSync(uploadDir, { recursive: true });

      const newImageUrls = req.files.map((file) => {
        const newPath = path.join(uploadDir, file.originalname);
        fs.renameSync(file.path, newPath);
        return `/uploads/${newFolderName}/${file.originalname}`;
      });

      job.imageUrls = job.imageUrls.concat(newImageUrls);
    }

    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Job by ID
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (deletedJob) {
      res.status(200).json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  upload,
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};
