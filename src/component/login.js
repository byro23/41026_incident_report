import React, { useState } from "react";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";

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
        const userId = data.user._id;

        console.log(userId);
        console.log("Login successful");
        setStatus("Details correct. Logging in.");

        if (userId === `6525084dc93df7b411560ea4`) {
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
        <input
          type="text"
          name="email"
          onChange={handleInputChange}
          id="email"
          placeholder="Email"
        ></input>
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          id="password"
          placeholder="Password"
        ></input>
        {status && <p className="status">{status}</p>}
        <input type="submit" value="LOGIN" className="btn" />
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
