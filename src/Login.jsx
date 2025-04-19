// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (name && dob) {
      localStorage.setItem("user", JSON.stringify({ name, dob }));
      navigate("/questions"); // Navigate to Questions
    } else {
      alert("Please enter your name and date of birth.");
    }
  };

  return (
    <div className="login-container">
      <h2>Enter Your Details</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="date" onChange={(e) => setDob(e.target.value)} />
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  );
};

export default Login;
