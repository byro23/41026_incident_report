// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import "./userHome.css";
import { Menubar } from "primereact/menubar";
import { useParams, Link, useNavigate } from "react-router-dom";
import Form from "./form";
import UserArchive from "./userArchive";
import SearchIncidents from "./searchForms";
import ViewMalls from "./viewMalls";

// Define a functional component called AdminHome
const AdminHome = () => {
  // Extract the 'userId' parameter from the route
  const { userId } = useParams();

  // Define state variables using the useState hook
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showArchive, setShowArchive] = useState(true);
  const [showMalls, setShowMalls] = useState(false);
  const [header, setHeader] = useState("Admin Incident Archive");

  // Get the 'navigate' function from the React Router
  const navigate = useNavigate();

  // Function to fetch user data
  const getUser = async () => {
    try {
      console.log("get name called");
      const response = await fetch("http://localhost:4000/api/user", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Retrieved user success");
        const data = await response.json();
        return data.user;
      } else {
        return "Could not find name";
      }
    } catch (error) {
      console.log(error);
      return "An error occurred";
    }
  };

  // Use the useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    const fetchName = async () => {
      const user = await getUser();
      setUserData(user);
    };
    fetchName();
  }, []);

  // Generate a welcome message based on user data
  const welcomeMessage = userData ? `Welcome, ${userData.firstname}` : "";

  // Define the menu items for the Menubar component
  const items = [
    {
      label: welcomeMessage,
      className: "welcome-user",
      disabled: true,
    },
    {
      label: "Home",
      command: () => {
        setShowForm(false);
        setShowArchive(true);
        setShowMalls(false);
        setHeader("Incident Archive");
      },
    },
    {
      label: "Report an incident",
      command: () => {
        setShowForm(true);
        setShowArchive(false);
        setShowMalls(false);
        setHeader("Report an incident");
      },
    },
    {
      label: "Shopping Malls",
      command: () => {
        setShowForm(false);
        setShowArchive(false);
        setShowMalls(true);
        setHeader("Shopping Malls");
      },
    },
    {
      label: "Sign out",
      command: () => {
        navigate("/login.js");
      },
    },
  ];

  // Render the component's JSX structure
  return (
    <>
      <Menubar model={items} />
      <h1 className="heading">{header}</h1>
      <div className="function-container">
        {showForm && <Form userData={userData} />}
        {showArchive && <SearchIncidents />}
        {showMalls && <ViewMalls />}
      </div>
    </>
  );
};

// Export the AdminHome component as the default export
export default AdminHome;
