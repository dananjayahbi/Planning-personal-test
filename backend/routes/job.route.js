const express = require("express");
const router = express.Router();
const {
  upload,
  createJob,
  getJobs,
  getJobById,
  deleteJob,
  updateJob,
} = require("../controllers/jobController");

// Create Job
router.post("/create", upload.array("images", 10), createJob);

// Get all Jobs
router.get("/getAllJobs", getJobs);

// Get a single Job by ID
router.get("/getJobById/:id", getJobById);

// Delete a Job by ID
router.delete("/deleteJob/:id", deleteJob);

// Update a Job by ID
router.put("/updateJob/:id", upload.array("images", 10), updateJob);

module.exports = router;
