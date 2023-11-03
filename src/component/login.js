import React, { useState } from "react";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setLoginData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        const userId = data.user._id;

        // Store the token in localStorage for future use
        localStorage.setItem("token", token);

        console.log(userId);
        console.log("Login successful");
        setStatus("Details correct. Logging in.");

        if (userId === `653cca249335e2b7841dc54f`) {
          setTimeout(() => {
            navigate(`/adminHome.js/${userId}`);
          }, 2000);
        } else {
          setTimeout(() => {
            navigate(`/userHome.js/${userId}`);
          }, 2000);
        }
      } else {
        console.error("Login failed");
        setStatus("Incorrect details. Try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error connecting to server, try again.")
    }
  };

  return (
    <div className="Login">
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <InputText
          type="text"
          name="email"
          onChange={handleInputChange}
          id="email"
          placeholder="Email"
          className="text-area"
          required
        ></InputText>
        <InputText
          type="password"
          name="password"
          onChange={handleInputChange}
          id="password"
          placeholder="Password"
          className = "text-area"
          required
        ></InputText>
        {status && <p className="status">{status}</p>}
        <Button className="" raised type="submit" rounded label="LOGIN" />
      </form>
      <Link className="link" to="/signup.js">
        Sign up
      </Link>
      <Link className="link" to="/forgetPassword.js">
        Forget Password
      </Link>
    </div>
  );
};

export default Login;

