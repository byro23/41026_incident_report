import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./archive.css";
import { useNavigate } from "react-router-dom";

export default function Archive() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);

  const fetchIncidents = async () => {
    const response = await fetch("http://localhost:4000/api/incidents");
    const data = await response.json();
    setIncidents(data);
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const onRowClick = (event) => {
    const incidentID = event.data.incidentID;
    navigate(`/incident/${incidentID}`);
  };

  return (
    <div className="centered-content">
      <DataTable
        value={incidents}
        paginator
        rows={10}
        onRowClick={onRowClick}
      >
        <Column
          field="date"
          header="Date"
          sortable
          body={(rowData) => {
            const date = new Date(rowData.date);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear().toString().slice(-2);
            return `${day}/${month}/${year}`;
          }}
        ></Column>
        <Column field="incidentTitle" header="Incident Title" sortable></Column>
        <Column
          field="offenderName"
          header="Offender Name"
          sortable
          body={(rowData) => {
            const offenderName = rowData.offenderName || "Unknown";
            return offenderName;
          }}
        ></Column>
        <Column
          field="incidentCategory"
          header="Incident Category"
          sortable
        ></Column>

        <Column field="status" header="Status" sortable></Column>
      </DataTable>
    </div>
  );
}
