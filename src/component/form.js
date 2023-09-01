import React, {useState} from 'react';
import './form.css';

const Form = () => {

    const[formData, setFormData] = useState( {
      witnessName: "",
      offenderName: "",
      date: "",
      description: "",
      incidentCategory: "",
      severityLevel: "",
      attachedFile: null
    })

    const handleFormChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setFormData(prevData => ({
            ...prevData,
            [fieldName]: fieldValue
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const severityLevels = ["Low", "Medium", "High"];

    const incidentCategories = ["Safety", "Security", "Technical", "Environmental"];
  

    return (
        <div className='incident-form'>
            <h2>Incident Form</h2>
            <form onSubmit={handleSubmit}>
                <div className='incident-form__text-area'>
                    <label htmlFor="name">Name of witness: </label>
                    <input type='text' id='witnessName' name='witnessName' onChange={handleFormChange} value={formData.witnessName}></input>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="phone">Your phone number: </label>
                    <input type='text' id='phone' name='phone' placeholder=''></input>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="name">Name of offender (if applicable): </label>
                    <input type='text' id='offenderName' name='offenderName' value={formData.offenderName}></input>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="title">Location/Venue: </label>
                    <input type='text' id='location' name='location'></input>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="date">Date of incident: </label>
                    <input type='date' id='date' name='date'></input>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="level">Incident Category: </label>
                    <select id="level" name='incidentCategory' value={formData.incidentCategory} onChange={handleFormChange}>
                        <option value="" disabled>Select a category</option>
                        {incidentCategories.map((level, index) => (
                            <option key={index} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="level">Severity Level: </label>
                    <select id="level" name='severityLevel' value={formData.severityLevel} onChange={handleFormChange}>
                        <option value="" disabled>Select a level</option>
                        {severityLevels.map((level, index) => (
                            <option key={index} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="description">Incident Description: </label>
                    <input type='text' id='description' name='description'></input>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="file">Attach image/video: </label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .mp4"
                    />
                </div>
                <input className='btn' type='submit' value="Submit"></input>
            </form>
        </div>
    );
}; 

export default Form;