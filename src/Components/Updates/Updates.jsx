import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "antd";
import "./Updates.scss";
import TextArea from "antd/es/input/TextArea";
import { updateService } from "../../Service/UpdateService";


const Updates = () => {
  const [addUpdateForm, setAddUpdateForm] = useState(false);
  const [updatesData, setUpdatesData] = useState([])
  const [update, setUpdate] = useState()

  useEffect(() => {
    getUpdates()
  }, [])

  const getUpdates = () => {
    updateService.getUpdates()
      .then(response => {
        setUpdatesData(response)
        setUpdate()
        getUpdates()
        setAddUpdateForm(false)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const createUpdate = () =>{
    const payload = {
      updateText: update
    }
    updateService.createUpdate(payload)
      .then(response => {
        console.log('response', response)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleCloseButton = () => {
    setAddUpdateForm(false)
  }

  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {!addUpdateForm && (
          <Button onClick={() => setAddUpdateForm(true)} className="add-button">
            Add Update
          </Button>
        )}
      </div>
      {addUpdateForm && (
        <div style={{margin:"10px"}}>
          <TextArea placeholder="Enter Update" onChange={(e) => setUpdate(e.target.value)} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "10px"
            }}
          >
            <Button onClick={handleCloseButton}>Close</Button>
            <Button onClick={createUpdate} className="add-button">Save</Button>
          </div>
        </div>
      )}

      <div className="updates-container">
        <h2>📢 Latest Updates</h2>
        <Row gutter={[16, 16]}>
          {updatesData?.map((update, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card className="update-card">{update?.updateText}</Card>
            </Col>
          ))}
        </Row>
      </div>
    </main>
  );
};

export default Updates;
