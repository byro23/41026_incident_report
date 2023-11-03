import React, { useState, useEffect } from "react";
import "./incident.css";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Image } from "primereact/image";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import EditIncident from "./editIncident";
import CancelIncident from "./cancelIncident";
import { Dropdown } from "primereact/dropdown";

function Incident() {
  // get incident id from URL
  const { id } = useParams();
  // initialize navigation
  const navigate = useNavigate();
  // initialize state variables
  const [incident, setIncident] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);
  const [version, editVersion] = useState(0);
  const [fileName, setFileName] = useState('');

  // fetch incident data from server
  const getIncident = async () => {
    const response = await fetch(`http://localhost:4000/api/getFormById/${id}`);
    const data = await response.json();
    setIncident(data);
    editVersion(data.versions.length - 1);
  };

  // fetch incident data on component mount
  useEffect(() => {
    getIncident();
  }, [id]);

  // handle edit button click
  useEffect(() => {
    setFileName(incident?.fileName || '');
    console.log(fileName)
  }, [incident])

  const handleEdit = () => {
    setEditVisible(true);
  };

  // handle cancel button click
  const handleCancel = () => {
    setCancelVisible(true);
  };

  // update edit dialog visibility
  const updateVisible = (value) => {
    setEditVisible(value);
  };

  // update cancel dialog visibility
  const updateCancelVisible = (value) => {
    setCancelVisible(value);
  };

  // navigate back to previous page
  const navBack = () => {
    navigate(-1);
  };

  // display loading message if incident data is not yet loaded
  const getFile = () => {
    return `http://localhost:4000/api/image/${fileName}`;
  }

  if (!incident) {
    return <div>Loading...</div>;
  }

  // render incident details
  return (
    <>
      {/* edit incident dialog */}
      <Dialog
        header="Header"
        visible={editVisible}
        onHide={() => setEditVisible(false)}
      >
        <EditIncident updateVisible={updateVisible} getIncident={getIncident} />
      </Dialog>
      {/* cancel incident dialog */}
      <Dialog
        header="Cancel Incident"
        visible={cancelVisible}
        onHide={() => setCancelVisible(false)}
      >
        <CancelIncident
          updateCancelVisible={updateCancelVisible}
          getIncident={getIncident}
        />
      </Dialog>
      {/* incident details */}
      <div className="incident-details-container">
        <div className="incident-details">
          {/* version dropdown */}
          <Dropdown
            options={Array.from(
              { length: incident.versions.length },
              (_, i) => ({
                label: `Version ${incident.versions.length - i}`,
                value: incident.versions.length - i - 1,
              })
            )}
            placeholder="Select a Version"
            value={version}
            onChange={(e) => editVersion(e.value)}
          />
          {/* incident panel */}
          <Panel
            header={`Incident: ${incident.versions[version].incidentTitle}`}
          >
            <p>
              Date:{" "}
              {new Date(incident.versions[version].date).toLocaleDateString()}
            </p>
            <p>Offender Name: {incident.versions[version].offenderName}</p>
            <p>
              Incident Category: {incident.versions[version].incidentCategory}
            </p>
            <p>Location: {incident.versions[version].incidentLocation}</p>
            <p>Description: {incident.versions[version].description}</p>
            {fileName  ? (
            <>
            <p>Attached image evidence:</p>
              <Image
                src={getFile()}
                width="30%"
                preview
                alt="Evidence"
              />
            </>
            ) : (
              <p>No image evidence supplied</p>
            )}
            <p>Status: {incident.status}</p>
            <p>
              Updated:{" "}
              {new Date(incident.versions[version].updatedAt).toLocaleString(
                "en-GB",
                {
                  timeStyle: "medium",
                  dateStyle: "medium",
                }
              )}
            </p>
            {/* back button */}
            <Button label="Back" onClick={navBack} /> &nbsp;
            {/* edit incident button */}
            <Button
              label="Edit Incident"
              onClick={handleEdit}
              disabled={version !== incident.versions.length - 1}
            />
            &nbsp; &nbsp;
            {/* cancel incident button */}
            <Button
              id="cancelButton"
              severity="danger"
              label="Cancel Incident"
              onClick={handleCancel}
              disabled={version !== incident.versions.length - 1}
            />
          </Panel>
          {/* display edit notes if available */}
          {incident.versions[version].editNote && (
            <Panel>
              <p>Edit Notes: {incident.versions[version].editNote}</p>
            </Panel>
          )}
        </div>
      </div>
    </>
  );
}

export default Incident;
