import React, { useState } from "react";
import { Modal, Form, Input, Upload, Select, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const AddJobModal = ({ visible, onCancel, onAdd }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
  
    const onFinish = async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        values.images.forEach((file) => {
          formData.append("images", file.originFileObj); // Corrected field name
        });
        formData.append("jobTitle", values.jobTitle);
        formData.append("description", values.description);
        formData.append("status", values.status);
        formData.append("responsesTxt", values.responsesTxt);
        formData.append("favLevel", values.favLevel);
  
        const response = await axios.post(
          "http://localhost:5000/job/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("Server response:", response.data);
  
        if (response.status === 201) {
          console.log("Job added successfully");
          onAdd();
          // Reset the form fields after successful submission
          form.resetFields();
        } else {
          console.error("Unexpected server response:", response);
        }
      } catch (error) {
        console.error("Error adding job:", error.response.data);
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
        title="Add New Job"
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
            Add
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            images: [],
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
  
          <Form.Item label="jobTitle" name="jobTitle">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Responses" name="responsesTxt">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select>
              <Option value="Just listed">Just listed</Option>
              <Option value="CV sent">CV sent</Option>
              <Option value="Responded">Responded</Option>
              <Option value="Interviewed">Interviewed</Option>
              <Option value="Selected">Selected</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Favourite Level" name="favLevel">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
}

export default AddJobModal