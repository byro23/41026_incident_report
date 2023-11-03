import React, { useState, useEffect, useCallback } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { useParams, useNavigate } from "react-router-dom";
import "./cancelIncident.css"

const CancelIncident = ({updateCancelVisible}, {getIncident}) => {

    const { id } = useParams()
    const navigate = useNavigate();


    const handleNo = () => {
        updateCancelVisible(false)
    }

    const handleYes = () => {
        console.log(`Form ID: ${id}`)
        fetch(`http://localhost:4000/api/incidentdelete/${id}`, {
        method: "DELETE"
      })
      .then((response) => {
        if (response.ok) {
            alert("Incident cancellation was successful.");
            navigate(-1)
        } else {
            alert(`Error: ${response.status}`)
          console.error('Request failed with status:', response.status);
        }
      })
      .catch((error) => {
        console.error('Request error:', error);
      });
    }

    return (
        <>
        <div className="container">
            <h3>Are you sure you want to cancel this incident submission?</h3>
            <div className="button-container">
            <Button label="Yes" className="p-button-success button" onClick={handleYes}></Button> &nbsp; &nbsp;
            <Button label="No" className="p-button-danger button" onClick={handleNo}></Button>
            </div>
            
        </div>
        </>
    )
}

export default CancelIncident;