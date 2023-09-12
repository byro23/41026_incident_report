import React, { Component } from 'react';
import "./signup.css";

class signup extends Component {
    render() {
      return (
        <div className="Signup">
        <h4>Login</h4>
        <form>
        <div className="text_area">
            <input
              type="text"
              id="companyid"
              name="companyid"
              defaultValue="Company ID"
              className="text_input"

            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="firstname"
              name="firstname"
              defaultValue="First Name"
              className="text_input"

            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="lastname"
              name="lastname"
              defaultValue="Last Name"
              className="text_input"

            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="email"
              name="email"
              defaultValue="Email Address"
              className="text_input"

            />
          </div>
          <div className="text_area">
            <input
              type="password"
              id="password"
              name="password"
              defaultValue="Password"
              className="text_input"

            />
          </div>
          <div className="text_area">
            <input
              type="password"
              id="password"
              name="password"
              defaultValue="Verify Password"
              className="text_input"

            />
          </div>
          <input
            type="submit"
            value="Sign-Up"
            className="btn"

          />
        </form>
        <a className="link" href="/login">Back to Login</a>
      </div>
    )
  }
}