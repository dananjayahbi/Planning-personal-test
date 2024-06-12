import React, { useState, useEffect } from "react";
import { List, Card, Button, Image, Input, Select, message } from "antd";
import axios from "axios";
import { CopyOutlined } from "@ant-design/icons";
import AddJobModal from "./AddJobModal";
import EditJobModal from "./EditJobModal";
import DeleteJobModal from "./DeleteJobModal";

const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [addJobModalVisible, setAddJobModalVisible] = useState(false);
  const [editJobModalVisible, setEditJobModalVisible] = useState(false);
  const [deleteJobModalVisible, setDeleteJobModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("all");

  const portfolio = "Link to portfolio";
  const git = "Link to GitHub";
  const UI = "Link to UI";

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/job/getAllJobs");
      // Prepend base URL to image URLs
      const jobsWithFullUrls = response.data.map((job) => ({
        ...job,
        imageUrls: job.imageUrls.map((url) => `http://localhost:5000${url}`),
      }));
      setJobs(jobsWithFullUrls);
      filterJobs(jobsWithFullUrls, selectedStatus);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = () => {
    setAddJobModalVisible(true);
  };

  const handleAddJobModalCancel = () => {
    setAddJobModalVisible(false);
  };

  const handleAddJobModalAdd = () => {
    setAddJobModalVisible(false);
    fetchJobs();
  };

  const handleEditJob = (job) => {
    setEditJobModalVisible(true);
    setSelectedJob(job);
  };

  const handleEditJobModalCancel = () => {
    setEditJobModalVisible(false);
  };

  const handleEditJobModalUpdate = () => {
    setEditJobModalVisible(false);
    fetchJobs();
  };

  const handleDeleteJob = (job) => {
    setDeleteJobModalVisible(true);
    setSelectedJob(job);
  };

  const handleDeleteJobModalCancel = () => {
    setDeleteJobModalVisible(false);
  };

  const handleDeleteJobModalDelete = () => {
    setDeleteJobModalVisible(false);
    fetchJobs();
  };

  const handleBackButton = () => {
    window.location.href = "/";
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    filterJobs(jobs, value);
  };

  const filterJobs = (jobs, status) => {
    if (status === "all") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) => job.status === status);
      setFilteredJobs(filtered);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success("Copied to clipboard!");
      })
      .catch((err) => {
        message.error("Failed to copy!");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Button
          type="primary"
          style={{ marginRight: "20px" }}
          onClick={handleBackButton}
        >
          Back
        </Button>
        <Button
          type="primary"
          style={{ marginRight: "20px" }}
          onClick={handleAddJob}
        >
          Add Job
        </Button>
        <Select
          value={selectedStatus}
          onChange={handleStatusChange}
          style={{ width: 200 }}
          placeholder="Select Status"
        >
          <Option value="all">All</Option>
          <Option value="Just Listed">Just Listed</Option>
          <Option value="CV sent">CV sent</Option>
          <Option value="Responded">Responded</Option>
          <Option value="Interviewed">Interviewed</Option>
          <Option value="Selected">Selected</Option>
        </Select>
      </div>
      <div>
        <h2 style={{ fontFamily: "sans-serif", textDecoration: "underline" }}>
          Important data
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "sans-serif",
            marginBottom: "10px",
          }}
        >
          <p style={{ margin: 0 }}>My Portfolio : &nbsp; </p>
          <Input
            value={portfolio}
            readOnly
            style={{ width: 200, marginRight: 8 }}
          />
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={() => copyToClipboard(portfolio)}
          >
            Copy
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "sans-serif",
            marginBottom: "10px",
          }}
        >
          <p style={{ margin: 0 }}>GitHub : &nbsp; </p>
          <Input
            value={git}
            readOnly
            style={{ width: 200, marginRight: 8 }}
          />
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={() => copyToClipboard(git)}
          >
            Copy
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "sans-serif",
            marginBottom: "35px",
          }}
        >
          <p style={{ margin: 0 }}>Ui Designs : &nbsp; </p>
          <Input
            value={UI}
            readOnly
            style={{ width: 200, marginRight: 8 }}
          />
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={() => copyToClipboard(UI)}
          >
            Copy
          </Button>
        </div>
      </div>
      <hr />
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredJobs}
        renderItem={(job) => (
          <List.Item>
            <Card
              hoverable
              actions={[
                <div>
                  <Button
                    type="primary"
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    onClick={() => handleEditJob(job)}
                  >
                    Update
                  </Button>
                  <Button
                    danger
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    onClick={() => handleDeleteJob(job)}
                  >
                    Delete
                  </Button>
                </div>,
              ]}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {job.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    style={{
                      width: "30%",
                      marginBottom: "6px",
                      marginLeft: "3px",
                      marginRight: "3px",
                    }}
                  >
                    <Image
                      alt={`image-${index}`}
                      style={{ width: "100%" }}
                      src={url}
                    />
                  </div>
                ))}
              </div>
              <Meta
                style={{ textAlign: "center", marginTop: "5px" }}
                // title={job.description}
                description={
                  <div style={{ textAlign: "left" }}>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Job Title:</b> &nbsp;
                      <Input type="text" readOnly value={job.jobTitle} />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Description:</b> &nbsp;
                      <TextArea
                        style={{ width: "95%", height: "100px" }}
                        autoSize
                        readOnly
                        value={job.description}
                      />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Status:</b> &nbsp;
                      <Input type="text" readOnly value={job.status} />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Responses:</b> &nbsp;
                      <TextArea
                        style={{ width: "95%", height: "100px" }}
                        autoSize
                        readOnly
                        value={job.responsesTxt}
                      />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Fav. Level:</b> &nbsp;
                      <Input type="text" readOnly value={job.favLevel} />
                    </div>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />
      {/* Add Job Modal */}
      <AddJobModal
        visible={addJobModalVisible}
        onCancel={handleAddJobModalCancel}
        onAdd={handleAddJobModalAdd}
      />
      {/* Edit Job Modal */}
      <EditJobModal
        visible={editJobModalVisible}
        selectedJob={selectedJob}
        onCancel={handleEditJobModalCancel}
        onUpdate={handleEditJobModalUpdate}
      />
      {/* Delete Job Modal */}
      <DeleteJobModal
        visible={deleteJobModalVisible}
        onCancel={handleDeleteJobModalCancel}
        onDelete={handleDeleteJobModalDelete}
        jobId={selectedJob._id}
      />
    </div>
  );
};

export default Jobs;
