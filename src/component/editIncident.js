import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { ProgressSpinner } from "primereact/progressspinner";
import "./editIncident.css";

function EditIncident({ updateVisible, getIncident }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    incidentTitle: "",
    incidentLocation: "",
    offenderName: "",
    date: "",
    description: "",
    incidentCategory: "",
    status: "",
    editNote: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      // Send a PUT request to the server to update the form
      fetch(`http://localhost:4000/api/updateForm/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          setLoading(false);
          getIncident();
          updateVisible(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [formData, id, updateVisible]
  );

  function sanitiseInput(input) {
    const str = String(input);

    const tempDiv = document.createElement("div");
    tempDiv.textContent = str;

    return tempDiv.innerHTML;
  }

  // Get existing incident data from server and update form data
  useEffect(() => {
    fetch(`http://localhost:4000/api/getFormById/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          incidentTitle: data.incidentTitle,
          incidentLocation: data.incidentLocation,
          offenderName: data.offenderName,
          date: data.date,
          description: data.description,
          incidentCategory: data.incidentCategory,
          status: data.status,
        });
        document.title = data.incidentTitle;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <div className="incident-details-container">
        <div className="incident-details">
          {loading && <ProgressSpinner />}
          <Panel header="Edit Incident Details">
            <form onSubmit={handleSubmit}>
              {/* Form fields for editing the incident details */}
              <label htmlFor="incidentTitle">Incident Title:</label>
              <InputText
                id="incidentTitle"
                value={formData.incidentTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    incidentTitle: sanitiseInput(e.target.value),
                  })
                }
              />

              <label htmlFor="incidentLocation">Incident Location:</label>
              <Dropdown
                id="incidentLocation"
                value={formData.incidentLocation}
                options={[
                  { label: "Select a category", value: "" },
                  {
                    label: "Broadway Sydney",
                    value: "Broadway Sydney",
                  },
                  {
                    label: "Westfield Sydney",
                    value: "Westfield Sydney",
                  },
                  {
                    label: "Pit Street Mall",
                    value: "Pit Street Mall",
                  },
                ]}
                onChange={(e) =>
                  setFormData({ ...formData, incidentLocation: e.target.value })
                }
              />

              <label htmlFor="offenderName">Offender Name:</label>
              <InputText
                id="offenderName"
                value={formData.offenderName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    offenderName: sanitiseInput(e.target.value),
                  })
                }
              />

              <label htmlFor="date">Date:</label>
              <Calendar
                required
                id="date"
                name="date"
                value={new Date(formData.date)}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: sanitiseInput(e.target.value),
                  })
                }
              />

              <label htmlFor="description">Description:</label>
              <InputTextarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: sanitiseInput(e.target.value),
                  })
                }
              />

              <label htmlFor="incidentCategory">Incident Category:</label>
              <Dropdown
                required
                id="incidentCategory"
                value={formData.incidentCategory}
                options={[
                  { label: "Select a category", value: "" },
                  {
                    label: "Safety",
                    value: "Safety",
                  },
                  {
                    label: "Security",
                    value: "Security",
                  },
                  {
                    label: "Technical",
                    value: "Technical",
                  },
                ]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    incidentCategory: sanitiseInput(e.target.value),
                  })
                }
              />

              <label htmlFor="status">Status:</label>
              <InputText
                disabled
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: sanitiseInput(e.target.value),
                  })
                }
              />
              <label htmlFor="editNote">Edit Notes:</label>
              <InputTextarea
                id="editNote"
                value={formData.editNote}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    editNote: sanitiseInput(e.target.value),
                  })
                }
              />
              <Button type="submit" label="Submit" />
            </form>
          </Panel>
        </div>
      </div>
    </>
  );
}

export default EditIncident;
