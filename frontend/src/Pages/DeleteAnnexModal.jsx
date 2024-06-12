import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";

const DeleteAnnexModal = ({ visible, onCancel, onDelete, annexId }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/annex/deleteAnnex/${annexId}`
      );

      if (response.status === 200) {
        message.success("Annex deleted successfully");
        onDelete(); // Trigger parent component's onDelete function
      } else {
        message.error("Failed to delete annex");
      }
    } catch (error) {
      console.error("Error deleting annex:", error.response.data);
      message.error("Failed to delete annex");
    } finally {
      setLoading(false);
      onCancel(); // Close the modal regardless of the outcome
    }
  };

  return (
    <Modal
      title="Delete Annex"
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
      <p>Are you sure you want to delete this annex?</p>
    </Modal>
  );
};

export default DeleteAnnexModal;
