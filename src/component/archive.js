import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./archive.css";

export default class archive extends Component {
  render() {
    return (
      <div className="centered-content">
        <DataTable value={mockData} paginator rows={10} sortField="date" sortOrder={-1}>
          <Column field="date" header="Date" sortable></Column>
          <Column field="incidentTitle" header="Incident" sortable></Column>
          <Column
            field="incidentCategory"
            header="Incident Category"
            sortable
          ></Column>
          <Column field="witnessName" header="Witness Name" sortable></Column>
          <Column field="offenderName" header="Offender Name" sortable></Column>
          <Column field="description" header="Description"></Column>
        </DataTable>
      </div>
    );
  }
}

const mockData = [
  {
    incidentTitle: "Burglary",
    witnessName: "Charlie White",
    offenderName: "Tracy A",
    date: "2023-03-22",
    description: "Description of the Burglary incident.",
    incidentCategory: "Theft",
    attachedFile: null,
  },
  {
    incidentTitle: "Vandalism",
    witnessName: "Hannah Red",
    offenderName: "Oscar D",
    date: "2023-05-30",
    description: "Description of the Accident incident.",
    incidentCategory: "Other",
    attachedFile: null,
  },
  {
    incidentTitle: "Disturbance",
    witnessName: "John Doe",
    offenderName: "Victor X",
    date: "2022-10-05",
    description: "Description of the Assault incident.",
    incidentCategory: "Physical",
    attachedFile: null,
  },
  {
    incidentTitle: "Fraud",
    witnessName: "Alice Johnson",
    offenderName: "Samuel B",
    date: "2023-04-12",
    description: "Description of the Harassment incident.",
    incidentCategory: "Theft",
    attachedFile: null,
  },
  {
    incidentTitle: "Vandalism",
    witnessName: "Edward Blue",
    offenderName: "Oscar D",
    date: "2023-02-26",
    description: "Description of the Theft incident.",
    incidentCategory: "Harassment",
    attachedFile: null,
  },
  {
    incidentTitle: "Assault",
    witnessName: "Bob Brown",
    offenderName: "Rachel C",
    date: "2023-05-05",
    description: "Description of the Assault incident.",
    incidentCategory: "Theft",
    attachedFile: null,
  },
  {
    incidentTitle: "Burglary",
    witnessName: "Fiona Black",
    offenderName: "Mike F",
    date: "2022-12-12",
    description: "Description of the Fraud incident.",
    incidentCategory: "Accident",
    attachedFile: null,
  },
  {
    incidentTitle: "Theft",
    witnessName: "Jane Smith",
    offenderName: "Rachel C",
    date: "2023-01-26",
    description: "Description of the Fraud incident.",
    incidentCategory: "Harassment",
    attachedFile: null,
  },
  {
    incidentTitle: "Theft",
    witnessName: "Charlie White",
    offenderName: "Victor X",
    date: "2023-05-27",
    description: "Description of the Disturbance incident.",
    incidentCategory: "Other",
    attachedFile: null,
  },
  {
    incidentTitle: "Burglary",
    witnessName: "Alice Johnson",
    offenderName: "Nina E",
    date: "2023-08-05",
    description: "Description of the Fire incident.",
    incidentCategory: "Physical",
    attachedFile: null,
  },
  {
    incidentTitle: "Disturbance",
    witnessName: "Bob Brown",
    offenderName: "Tracy A",
    date: "2023-03-03",
    description: "Description of the Theft incident.",
    incidentCategory: "Other",
    attachedFile: null,
  },
  {
    incidentTitle: "Fire",
    witnessName: "Alice Johnson",
    offenderName: "Victor X",
    date: "2023-02-22",
    description: "Description of the Assault incident.",
    incidentCategory: "Property Damage",
    attachedFile: null,
  },
  {
    incidentTitle: "Accident",
    witnessName: "Daisy Green",
    offenderName: "Victor X",
    date: "2023-02-06",
    description: "Description of the Disturbance incident.",
    incidentCategory: "Property Damage",
    attachedFile: null,
  },
  {
    incidentTitle: "Fire",
    witnessName: "Jane Smith",
    offenderName: "Samuel B",
    date: "2022-10-12",
    description: "Description of the Trespassing incident.",
    incidentCategory: "Physical",
    attachedFile: null,
  },
  {
    incidentTitle: "Fire",
    witnessName: "Jane Smith",
    offenderName: "Ursula Y",
    date: "2022-10-31",
    description: "Description of the Assault incident.",
    incidentCategory: "Harassment",
    attachedFile: null,
  },
  {
    incidentTitle: "Assault",
    witnessName: "John Doe",
    offenderName: "Ursula Y",
    date: "2023-08-08",
    description: "Description of the Vandalism incident.",
    incidentCategory: "Other",
    attachedFile: null,
  },
  {
    incidentTitle: "Fraud",
    witnessName: "Bob Brown",
    offenderName: "Linda G",
    date: "2023-07-22",
    description: "Description of the Theft incident.",
    incidentCategory: "Theft",
    attachedFile: null,
  },
  {
    incidentTitle: "Trespassing",
    witnessName: "John Doe",
    offenderName: "Mike F",
    date: "2022-09-20",
    description: "Description of the Fraud incident.",
    incidentCategory: "Other",
    attachedFile: null,
  },
  {
    incidentTitle: "Fraud",
    witnessName: "Alice Johnson",
    offenderName: "Ursula Y",
    date: "2023-05-20",
    description: "Description of the Disturbance incident.",
    incidentCategory: "Property Damage",
    attachedFile: null,
  },
  {
    incidentTitle: "Fraud",
    witnessName: "Charlie White",
    offenderName: "Tracy A",
    date: "2023-05-05",
    description: "Description of the Disturbance incident.",
    incidentCategory: "Theft",
    attachedFile: null,
  },
];
