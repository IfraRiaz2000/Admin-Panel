import React, { useState } from "react";
import "./LoginForm.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function LoginForm() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (username === "admin" && password === "12345") {
      navigate("/");
    } else {

      alert("Incorrect Credentials");
    }
  }




  return (
    <div className="form-container">
      <img src={logo} alt="" className="logo" />
      <h1 className="adminTag">Admin Login</h1>

      <form className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label htmlFor="password" >Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />

        <Link to="/">
          <button type="button" className="loginButton" onClick={handleLogin}>Login</button>
        </Link>
      </form>
    </div>
  );
}
