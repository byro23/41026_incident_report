import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "./searchForms.css";
import { RadioButton } from "primereact/radiobutton";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";

const SearchIncidents = () => {
  const [searchCriteria, setSearchCriteria] = useState("incidentLocation"); // Default to "location"
  const [searchTerm, setSearchTerm] = useState("");

  const [incidents, setIncidents] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [initialStatus, setInitialStatus] = useState("pending");
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      console.log(debouncedSearchTerm);
      fetch(
        `http://localhost:4000/api/searchIncidents?searchCriteria=${searchCriteria}&searchTerm=${debouncedSearchTerm}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setIncidents(data))
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIncidents([]);
    }
  }, [debouncedSearchTerm, searchCriteria]);
  const handleSearch = (e) => {
    setSearchTerm(e);
  };
  const handleStatus = (id, status) => {
    const requestBody = {
      id: id,
      status: status,
    };

    fetch(`http://localhost:4000/api/approveIncident`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const updatedIncidents = incidents.map((form) => {
          if (form._id === id) {
            return { ...form, status: status };
          }
          return form;
        });
        setIncidents(updatedIncidents);
      })
      .catch((error) => {
        console.error("Error approving incident:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSearchCriteriaChange = (e) => {
    setSearchCriteria(e);
    setSearchTerm("");
  };
  const onRowClick = (event) => {
    const incidentID = event.data._id;
    console.log(incidentID);
    navigate(`/incident/${incidentID}`);
  };
  const actionButton = (rowData) => {
    if (rowData.status === "pending") {
      return (
        <div className="button-container">
          <Button
            icon="pi pi-check"
            tooltip="Approve"
            className="approve-button"
            onClick={() => handleStatus(rowData._id, "Approved")}
            disabled={rowData.status === "Approved"}
          />
          <Button
            icon="pi pi-times"
            tooltip="Reject"
            className="reject-button"
            onClick={() => handleStatus(rowData._id, "Rejected")}
            disabled={rowData.status === "Rejected"}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="elementContainer">
      {/* <h2 className="header">Search Incidents by Location</h2> */}
      <div className="search-container">
        <label className="label" htmlFor="search-criteria">
          Search Criteria:
        </label>
        <Dropdown
          id="search-criteria"
          className="select"
          value={searchCriteria}
          options={[
            { label: "Location", value: "incidentLocation" },
            { label: "Incident Title", value: "incidentTitle" },

            { label: "Incident Category", value: "incidentCategory" },
            // { label: "Form Status", value: "status" },
          ]}
          onChange={(e) => handleSearchCriteriaChange(e.value)}
          placeholder="Select a criteria"
        />
        <input
          type="text"
          id="search-term"
          className="input-text"
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div>
        <span>
          <RadioButton
            className="radioButton"
            inputId="item1"
            name="status"
            value="Approved"
            onChange={(e) => setInitialStatus(e.value)}
            checked={initialStatus === "Approved"}
          />
          <label htmlFor="item1" className="ml-4">
            Approved
          </label>
        </span>
        <span>
          <RadioButton
            className="radioButton"
            inputId="item2"
            name="status"
            value="pending"
            onChange={(e) => setInitialStatus(e.value)}
            checked={initialStatus === "pending"}
          />
          <label htmlFor="item2" className="ml-4">
            Pending
          </label>
        </span>
        <span>
          <RadioButton
            className="radioButton"
            inputId="item3"
            name="status"
            value="Rejected"
            onChange={(e) => setInitialStatus(e.value)}
            checked={initialStatus === "Rejected"}
          />
          <label htmlFor="ingredient3" className="ml-4">
            Rejected
          </label>
        </span>
      </div>
      <div>
        {searchTerm === "" ? (
          <h3 className="h3 center-text">All Incidents</h3>
        ) : (
          <h3 className="h3 center-text">Search Results:</h3>
        )}

        {incidents.length > 0 ? (
          <>
            <div className="centered-content">
              {loading ? (
                <ProgressSpinner />
              ) : (
                <DataTable
                  value={incidents.filter(
                    (incident) => incident.status === initialStatus
                  )}
                  paginator
                  rows={10}
                  sortField="status"
                  onRowClick={onRowClick}
                  size="normal"
                >
                  <Column
                    field="incidentTitle"
                    header="Incident Title"
                    sortable
                  ></Column>
                  <Column
                    field="date"
                    header="Date"
                    sortable
                    body={(rowData) =>
                      new Date(rowData.date).toLocaleDateString()
                    }
                  ></Column>
                  <Column
                    field="incidentLocation"
                    header="Incident Location"
                    sortable
                  ></Column>
                  <Column
                    field="incidentCategory"
                    header="Incident Category"
                    sortable
                  ></Column>
                  <Column
                    field="offenderName"
                    header="Offender Name"
                    sortable
                  ></Column>
                  <Column field="status" header="Status" sortable></Column>

                  <Column header="Action" body={actionButton} />
                </DataTable>
              )}
            </div>{" "}
          </>
        ) : (
          <p className="no-results">No search results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchIncidents;
