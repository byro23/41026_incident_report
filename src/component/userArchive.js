import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';      
import './userArchive.css'

const UserArchive = ( {userData} ) => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); 

  const userId = userData ? userData._id : 'Id could not be retrieved in time';
  const [loading, setLoading] = useState(true);

  // Navigate to incident component on row click
  const onRowClick = (event) => {
    const incidentID = event.data._id;
    navigate(`/incident/${incidentID}`);
  };

  // Responsible for debouncing the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);


  // Responsible for retrieving incidents by search term
  useEffect(() => {
    if(debouncedSearchTerm !== "") {
      fetch(
        `http://localhost:4000/api/searchIncidents?searchTerm=${debouncedSearchTerm}&userId=${userId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setForms(data))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    else {
      getIncidents()
      .then((data) => {
        setForms(data)
      })
    }
  }, [debouncedSearchTerm])

  // Retrieves all forms associated with user
  const getIncidents = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/getFormsById?userId=${userId}`);
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        console.log('failed to fetch forms');
      }
    } 
    catch (error) {
      console.log(error);
    } 
    finally {
      setLoading(false);
    }
  }

  // Fetches incidents when the userData is retrieved
  useEffect(() => {
    const fetchIncidents = async () => {
      if (userData) {
        const forms = await getIncidents();
        setForms(forms);
      }
    };
    fetchIncidents();
  }, [userData]);

  return (
    <>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText placeholder="Search by title..." onChange={(e) => setSearchTerm(e.target.value)} />
      </span>
      <div className="data-table">
        {loading ? (
          <ProgressSpinner />
        ) : (
          <DataTable
            value={forms}
            paginator
            rows={10}
            sortField="status"
            onRowClick={onRowClick}
            size="normal"
          >
            <Column field="incidentTitle" header="Incident Title" sortable></Column>
            <Column field="date" header="Date" sortable body={(rowData) => new Date(rowData.date).toLocaleDateString()}></Column>
            <Column
              field="incidentCategory"
              header="Incident Category"
              sortable
            ></Column>
            <Column field="description" header="Description" sortable></Column>
            <Column field="offenderName" header="Offender Name" sortable></Column>
            <Column field="status" header="Status" sortable></Column>
          </DataTable>
        )}
      </div>
    </>
  );
}

export default UserArchive;