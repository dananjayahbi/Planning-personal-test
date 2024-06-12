import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";


const DeleteJobModal = ({ visible, onCancel, onDelete, jobId }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
      setLoading(true);
      try {
        const response = await axios.delete(
          `http://localhost:5000/job/deleteJob/${jobId}`
        );
  
        if (response.status === 200) {
          message.success("Job deleted successfully");
          onDelete(); // Trigger parent component's onDelete function
        } else {
          message.error("Failed to delete job");
        }
      } catch (error) {
        console.error("Error deleting job:", error.response.data);
        message.error("Failed to delete job");
      } finally {
        setLoading(false);
        onCancel(); // Close the modal regardless of the outcome
      }
    };
  
    return (
      <Modal
        title="Delete Job"
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            loading={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this job?</p>
      </Modal>
    );
}

export default DeleteJobModal