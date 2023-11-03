import React, { useState } from "react";
import './forgetPassword.css'
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {Link} from 'react-router-dom';


function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(null);
  const [emailNotFoundError, setEmailNotFoundError] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match. Please try again.");
      return;
    }

    // Send a request to check if the email exists in the database
    try {
      const response = await fetch("http://localhost:4000/api/checkemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.status === 200) {
        // Email exists in the database; proceed to update password
        try {
          const updateResponse = await fetch("http://localhost:4000/api/updatepassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (updateResponse.status === 200) {
            setPasswordUpdated(true);
          } else {
            console.log("failed to update password");
          }
        } catch (updateError) {
          console.log(updateError);
        }
      } else {
        setEmailNotFoundError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {passwordUpdated ? (
        <div>
          <h1>Password Updated Successfully</h1>
          {/* You can display a message or redirect the user to a login page */}
        </div>
      ) : (
        <div className="forgot-container">
          <h4>Reset Password</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <InputText
                type="email"
                value={email}
                className="text-area"
                placeholder="Confirm email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {emailNotFoundError && (
              <div className="error">Email not found in the database.</div>
            )}
            <div>
              <InputText
                type="password"
                placeholder="New password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="text-area"
              />
            </div>
            <div>
              <InputText
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                placeholder="Confirm password"
                className="text-area"
              />
            </div>
            {passwordMatchError && (
              <div className="error">{passwordMatchError}</div>
            )}
            <div>
              <Button type="submit" rounded raised label="Submit"/>
            </div>
          </form>
          <Link className="link" to='/login.js'>Return to login</Link>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
