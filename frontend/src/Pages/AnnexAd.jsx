import React, { useState, useEffect } from "react";
import { List, Card, Button, Image, Input } from "antd";
import axios from "axios";

const { Meta } = Card;
const { TextArea } = Input;

const AnnexAd = () => {
  const [annexes, setAnnexes] = useState([]);

  useEffect(() => {
    const fetchAnnexes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/annex/getAllAnnexes"
        );
        // Prepend base URL to image URLs
        const annexesWithFullUrls = response.data.map((annex) => ({
          ...annex,
          imageUrls: annex.imageUrls.map(
            (url) => `http://localhost:5000${url}`
          ),
        }));
        setAnnexes(annexesWithFullUrls);
      } catch (error) {
        console.error("Error fetching annexes:", error);
      }
    };

    fetchAnnexes();
  }, []);

  const handleUpdate = (id) => {
    console.log("Update annex with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete annex with id:", id);
  };

  return (
    <div style={{ padding: "20px" }}>
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
                    onClick={() => handleUpdate(annex._id)}
                  >
                    Update
                  </Button>
                  <Button
                    danger
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    onClick={() => handleDelete(annex._id)}
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
    </div>
  );
};

export default AnnexAd;
