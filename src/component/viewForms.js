import React, { useEffect, useState } from "react";

const FormList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/getForms")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setForms(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        // You can set a state variable to track the error and display a message to the user.
      });
  }, []);

  return (
    <div>
      <h2>Form List</h2>
      <table>
        <thead>
          <tr>
            <th>Incident Title</th>
            <th>Incident Location</th>
            <th>Offender Name</th>
            <th>Date</th>
            <th>Description</th>
            <th>Incident Category</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form._id}>
              <td>{form.incidentTitle}</td>
              <td>{form.incidentLocation}</td>
              <td>{form.offenderName}</td>
              <td>{new Date(form.date).toLocaleDateString()}</td>
              <td>{form.description}</td>
              <td>{form.incidentCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormList;
