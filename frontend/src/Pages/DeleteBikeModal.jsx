import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";

const DeleteBikeModal = ({ visible, onCancel, onDelete, bikeId }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
      setLoading(true);
      try {
        const response = await axios.delete(
          `http://localhost:5000/bike/deleteBike/${bikeId}`
        );
  
        if (response.status === 200) {
          message.success("Bike deleted successfully");
          onDelete(); // Trigger parent component's onDelete function
        } else {
          message.error("Failed to delete bike");
        }
      } catch (error) {
        console.error("Error deleting bike:", error.response.data);
        message.error("Failed to delete bike");
      } finally {
        setLoading(false);
        onCancel(); // Close the modal regardless of the outcome
      }
    };
  
    return (
      <Modal
        title="Delete Bike"
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
        <p>Are you sure you want to delete this bike?</p>
      </Modal>
    );
}

export default DeleteBikeModal