import React, { useState, useEffect, useRef } from "react";
import "./form.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressSpinner } from 'primereact/progressspinner';

const Form = ({ userData }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null); // Use a state variable to store the map
  const [searchTerm, setSearchTerm] = useState("");
  const [malls, setMalls] = useState([]);

  useEffect(() => {
    // Initialize the map when the component mounts
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.006 }, // Set initial map center
      zoom: 12, // Set initial zoom level
    });

    setMap(googleMap);
  }, []);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Create an instance of the Places service
    const placesService = new window.google.maps.places.PlacesService(map);

    // Define the search request
    const request = {
      query: `Shopping Mall ${searchTerm}`,
      fields: ["name"],
    };

    // Perform the text-based search
    placesService.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const mallOptions = results.map((mall) => ({
          label: mall.name,
          value: mall.name,
        }));
        setMalls(mallOptions);
      } else {
        console.error("Error fetching shopping malls:", status);
      }
    });
  };

  const userId = userData ? userData._id : null;

  const [formData, setFormData] = useState({
    incidentTitle: "",
    incidentLocation: "",
    offenderName: "",
    date: "",
    description: "",
    incidentCategory: "",
    status: "pending",
    userId: userId,
    fileName: null
  });

  const[file, setFile] = useState(null);
  const[loading, setLoading] = useState(false)

  const handleFormChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };

  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formObject;

    console.log("Incident title", formData.incidentTitle)

    if(formData.incidentTitle === "" || formData.description === "" || formData.incidentLocation === "" 
    || formData.date === null) {
        setStatus("One of the mandatory fields was empty. Please try again.")
    }
    else {
        console.log("Form object", formObject)
        setLoading(true);
        try {
            if(file !== null) {
                const formDataFile = new FormData();
                formDataFile.append('file', file)
                // First try to upload file
                const uploadResponse = await fetch('http://localhost:4000/api/upload', {
                    method: 'POST',
                    body : formDataFile
                })
                if(uploadResponse.status === 200) {
                    const data = await uploadResponse.json();
                    console.log(data)
                    const resFileName = data.file.filename
                    formObject = {...formData, 'fileName' : resFileName}
                }
                else {
                    setStatus("File failed to upload.");
                    setLoading(false);
                    console.log("File failed to submit to database");
                    return;
                }
            }
            else {
                formObject = {...formData}
            }
            console.log("Form object", formObject);

            const response = await fetch('http://localhost:4000/api/submit', {
                method: 'POST',
                body : JSON.stringify(formObject),
                headers: {
                    'Content-Type': 'application/json', 
                },
            })

            if(response.status === 200) {
                console.log(userId)
                console.log('Form data submitted sucessfully.')
                setFormData({
                    incidentTitle: "",
                    incidentLocation: "",
                    offenderName: "",
                    date: "",
                    description: "",
                    incidentCategory: "",
                    status: 'pending',
                    userId: userId,
                    fileName: "",

                }) 
                setFile(null)
                setSearchTerm("")
                setLoading(false);
                setStatus('Incident form submitted successfully.')
            }
            else {
                setLoading(false);
                console.log('Form submission failed.')
                setStatus('Form fail to submit, please try again.')
            }
        }
        catch(error) {
            setLoading(false);
            console.log(error)
            setStatus('Form fail to submit, please try again.')
        }
    }
    
}

const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const incidentCategories = [
    "Safety",
    "Security",
    "Technical",
    "Environmental",
  ];

  const locations = ["Broadway Sydney", "Westfield Sydney", "Pit Street Mall"];

  return (
    <div className="incident-form">
      <form id="incidentForm" onSubmit={handleSubmit}>
        <div className="incident-form__text-area">
          <InputText
            type="text"
            id="incidentTitle"
            placeholder="Title*"
            name="incidentTitle"
            onChange={handleFormChange}
            value={formData.incidentTitle}
          ></InputText>
        </div>
        <div className="incident-form__text-area">
          <input
            type="text"
            placeholder="Search for shopping malls..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <div ref={mapRef} className="map-container"></div>
          <Dropdown
            className="dropdown"
            id="incidentLocation"
            name="incidentLocation"
            placeholder="Venue Names"
            options={malls}
            value={formData.incidentLocation}
            onChange={handleFormChange}
            disabled={malls.length === 0 || searchTerm === ""}
          ></Dropdown>
        </div>
        <div className="incident-form__text-area">
          <Calendar
            className="custom-date"
            placeholder="Date of incident"
            id="date"
            value={formData.date}
            onChange={handleFormChange}
            name="date"
          ></Calendar>
        </div>
        <div className="incident-form__text-area">
          <Dropdown
            id="incidentCategory"
            className="dropdown"
            options={incidentCategories}
            placeholder="Incident Categories"
            name="incidentCategory"
            value={formData.incidentCategory}
            onChange={handleFormChange}
          />
        </div>
        <div className="incident-form__text-area">
          <InputTextarea
            id="description"
            placeholder="Description (character limit 500)"
            value={formData.description}
            onChange={handleFormChange}
            name="description"
            rows="5"
            maxLength="500"
            autoResize
          ></InputTextarea>
        </div>
        <div className="incident-form__text-area">
          <InputText
            type="text"
            placeholder="Name of offender (if applicable)"
            id="offenderName"
            name="offenderName"
            onChange={handleFormChange}
            value={formData.offenderName}
          ></InputText>
        </div>
        <div className='incident-form__text-area'>
                    <label htmlFor="file">Attach image/video: </label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                    />
        </div>
        {loading ? <ProgressSpinner className="progress-spinner" style={{width: '50px', height: '50px'}}/> : null}
        {status && <p className="status">{status}</p>}
        <Button
          className="submit-button"
          icon="pi pi-check"
          iconPos="right"
          severity="success"
          type="submit"
          label="Submit"
          raised
        ></Button>
      </form>
    </div>
  );
};

export default Form;
