import React, { useState, useEffect } from "react";
import { List, Card, Button, Image, Input } from "antd";
import axios from "axios";
import AddBikeModal from "./AddBikeModal";
import EditBikeModal from "./EditBikeModal";
import DeleteBikeModal from "./DeleteBikeModal";

const { Meta } = Card;
const { TextArea } = Input;

const BikeAd = () => {
  const [bikes, setBikes] = useState([]);
  const [addBikeModalVisible, setAddBikeModalVisible] = useState(false);
  const [editBikeModalVisible, setEditBikeModalVisible] = useState(false);
  const [deleteBikeModalVisible, setDeleteBikeModalVisible] = useState(false);
  const [selectedBike, setSelectedBike] = useState({});

  const fetchBikes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/bike/getAllBikes"
      );
      // Prepend base URL to image URLs
      const bikesWithFullUrls = response.data.map((bike) => ({
        ...bike,
        imageUrls: bike.imageUrls.map((url) => `http://localhost:5000${url}`),
      }));
      setBikes(bikesWithFullUrls);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleAddBike = () => {
    setAddBikeModalVisible(true);
  };

  const handleAddBikeModalCancel = () => {
    setAddBikeModalVisible(false);
  };

  const handleAddBikeModalAdd = () => {
    setAddBikeModalVisible(false);
    fetchBikes();
  };

  const handleEditBike = (bike) => {
    setEditBikeModalVisible(true);
    setSelectedBike(bike);
  };

  const handleEditBikeModalCancel = () => {
    setEditBikeModalVisible(false);
  };

  const handleEditBikeModalUpdate = () => {
    setEditBikeModalVisible(false);
    fetchBikes();
  };

  const handleDeleteBike = (bike) => {
    setDeleteBikeModalVisible(true);
    setSelectedBike(bike);
  };

  const handleDeleteBikeModalCancel = () => {
    setDeleteBikeModalVisible(false);
  };

  const handleDeleteBikeModalDelete = () => {
    setDeleteBikeModalVisible(false);
    fetchBikes();
  };

  const handleBackButton = () => {
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{marginBottom: "20px"}}>
        <Button type="primary" style={{marginRight: "20px"}} onClick={handleBackButton}>Back</Button>
        <Button type="primary" onClick={handleAddBike}>Add Bike</Button>
      </div>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={bikes}
        renderItem={(bike) => (
          <List.Item>
            <Card
              hoverable
              actions={[
                <div>
                  <Button
                    type="primary"
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    onClick={() => handleEditBike(bike)}
                  >
                    Update
                  </Button>
                  <Button
                    danger
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    onClick={() => handleDeleteBike(bike)}
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
                {bike.imageUrls.map((url, index) => (
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
                // title={bike.description}
                description={
                  <div style={{ textAlign: "left" }}>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Price:</b> &nbsp;
                      <Input type="text" readOnly value={bike.price} />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Location:</b> &nbsp;
                      <Input type="text" readOnly value={bike.location} />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Description:</b> &nbsp;
                      <TextArea
                        style={{ width: "95%", height: "100px" }}
                        autoSize
                        readOnly
                        value={bike.description}
                      />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Mobile No:</b> &nbsp;
                      <Input type="text" readOnly value={bike.mobileNo} />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Status:</b> &nbsp;
                      <Input type="text" readOnly value={bike.status} />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Fav. Level:</b> &nbsp;
                      <Input type="text" readOnly value={bike.favLevel} />
                    </div>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />
      {/* Add Bike Modal */}
      <AddBikeModal
        visible={addBikeModalVisible}
        onCancel={handleAddBikeModalCancel}
        onAdd={handleAddBikeModalAdd}
      />
      {/* Edit Bike Modal */}
      <EditBikeModal
        visible={editBikeModalVisible}
        selectedBike={selectedBike}
        onCancel={handleEditBikeModalCancel}
        onUpdate={handleEditBikeModalUpdate}
      />
      {/* Delete Bike MNodal */}
      <DeleteBikeModal
        visible={deleteBikeModalVisible}
        onCancel={handleDeleteBikeModalCancel}
        onDelete={handleDeleteBikeModalDelete}
        bikeId={selectedBike._id}
      />
    </div>
  );
}

export default BikeAd