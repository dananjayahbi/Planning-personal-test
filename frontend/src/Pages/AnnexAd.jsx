import React, { useState, useEffect } from "react";
import { List, Card, Button, Image, Input } from "antd";
import axios from "axios";
import AddAnnexModal from "./AddAnnexModal";
import EditAnnexModal from "./EditAnnexModal";
import DeleteAnnexModal from "./DeleteAnnexModal";

const { Meta } = Card;
const { TextArea } = Input;

const AnnexAd = () => {
  const [annexes, setAnnexes] = useState([]);
  const [addAnnexModalVisible, setAddAnnexModalVisible] = useState(false);
  const [editAnnexModalVisible, setEditAnnexModalVisible] = useState(false);
  const [deleteAnnexModalVisible, setDeleteAnnexModalVisible] = useState(false);
  const [selectedAnnex, setSelectedAnnex] = useState({});

  const fetchAnnexes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/annex/getAllAnnexes"
      );
      // Prepend base URL to image URLs
      const annexesWithFullUrls = response.data.map((annex) => ({
        ...annex,
        imageUrls: annex.imageUrls.map((url) => `http://localhost:5000${url}`),
      }));
      setAnnexes(annexesWithFullUrls);
    } catch (error) {
      console.error("Error fetching annexes:", error);
    }
  };

  useEffect(() => {
    fetchAnnexes();
  }, []);

  const handleAddAnnex = () => {
    setAddAnnexModalVisible(true);
  };

  const handleAddAnnexModalCancel = () => {
    setAddAnnexModalVisible(false);
  };

  const handleAddAnnexModalAdd = () => {
    setAddAnnexModalVisible(false);
    fetchAnnexes();
  };

  const handleEditAnnex = (annex) => {
    setEditAnnexModalVisible(true);
    setSelectedAnnex(annex);
  };

  const handleEditAnnexModalCancel = () => {
    setEditAnnexModalVisible(false);
  };

  const handleEditAnnexModalUpdate = () => {
    setEditAnnexModalVisible(false);
    fetchAnnexes();
  };

  const handleDeleteAnnex = (annex) => {
    setDeleteAnnexModalVisible(true);
    setSelectedAnnex(annex);
  };

  const handleDeleteAnnexModalCancel = () => {
    setDeleteAnnexModalVisible(false);
  };

  const handleDeleteAnnexModalDelete = () => {
    setDeleteAnnexModalVisible(false);
    fetchAnnexes();
  };

  const handleBackButton = () => {
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{marginBottom: "20px"}}>
        <Button type="primary" style={{marginRight: "20px"}} onClick={handleBackButton}>Back</Button>
        <Button type="primary" onClick={handleAddAnnex}>Add Annex</Button>
      </div>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={annexes}
        renderItem={(annex) => (
          <List.Item>
            <Card
              hoverable
              actions={[
                <div>
                  <Button
                    type="primary"
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    onClick={() => handleEditAnnex(annex)}
                  >
                    Update
                  </Button>
                  <Button
                    danger
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    onClick={() => handleDeleteAnnex(annex)}
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
                {annex.imageUrls.map((url, index) => (
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
                // title={annex.description}
                description={
                  <div style={{ textAlign: "left" }}>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Price:</b> &nbsp;
                      <Input type="text" readOnly value={annex.price} />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Location:</b> &nbsp;
                      <Input type="text" readOnly value={annex.location} />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Description:</b> &nbsp;
                      <TextArea
                        style={{ width: "95%", height: "100px" }}
                        autoSize
                        readOnly
                        value={annex.description}
                      />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Mobile No:</b> &nbsp;
                      <Input type="text" readOnly value={annex.mobileNo} />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Status:</b> &nbsp;
                      <Input type="text" readOnly value={annex.status} />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      <b>Fav. Level:</b> &nbsp;
                      <Input type="text" readOnly value={annex.favLevel} />
                    </div>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />
      {/* Add Annex Modal */}
      <AddAnnexModal
        visible={addAnnexModalVisible}
        onCancel={handleAddAnnexModalCancel}
        onAdd={handleAddAnnexModalAdd}
      />
      {/* Edit Anned Modal */}
      <EditAnnexModal
        visible={editAnnexModalVisible}
        selectedAnnex={selectedAnnex}
        onCancel={handleEditAnnexModalCancel}
        onUpdate={handleEditAnnexModalUpdate}
      />
      {/* Delete Annex MNodal */}
      <DeleteAnnexModal
        visible={deleteAnnexModalVisible}
        onCancel={handleDeleteAnnexModalCancel}
        onDelete={handleDeleteAnnexModalDelete}
        annexId={selectedAnnex._id}
      />
    </div>
  );
};

export default AnnexAd;
