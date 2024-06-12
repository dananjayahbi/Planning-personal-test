import React, { useState } from "react";
import { Modal, Form, Input, Upload, Select, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const EditAnnexModal = ({ visible, onCancel, onUpdate, selectedAnnex }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      values.images.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("location", values.location);
      formData.append("status", values.status);
      formData.append("mobileNo", values.mobileNo);
      formData.append("favLevel", values.favLevel);

      const response = await axios.put(
        `http://localhost:5000/annex/updateAnnex/${selectedAnnex._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response.data);

      if (response.status === 200) {
        console.log("Annex updated successfully");
        onUpdate();
      } else {
        console.error("Unexpected server response:", response);
      }
    } catch (error) {
      console.error("Error updating annex:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset the form fields when the modal is canceled
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Add New Annex AD"
      visible={visible}
      style={{ top: 20 }}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={form.submit}
        >
          Update
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          images: [],
          description: selectedAnnex.description,
          price: selectedAnnex.price,
          location: selectedAnnex.location,
          mobileNo: selectedAnnex.mobileNo,
          status: selectedAnnex.status,
          favLevel: selectedAnnex.favLevel,
        }}
      >
        <Form.Item
          label="Images"
          name="images"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            listType="picture"
            multiple={true} // Allow multiple file selection
            maxCount={5}
            beforeUpload={() => false} // Prevent auto upload
          >
            <Button icon={<UploadOutlined />}>Choose Images</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <Input />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>
        <Form.Item label="Mobile Number" name="mobileNo">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select>
            <Option value="Nothing Did">Nothing did</Option>
            <Option value="Called">Called</Option>
            <Option value="Willing To Visit">Willing to visit</Option>
            <Option value="Visited">Visited</Option>
            <Option value="Purchased">Purchased</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Favourite Level" name="favLevel">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAnnexModal;
