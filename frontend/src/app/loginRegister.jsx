import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./loginRegister.css";   


export default function Login() {
  const [activeForm, setActiveForm] = useState("login");

  const [registerObj, setRegisterObj] = useState({
    name: "",
    surname: "",
    idNumber: "",
    accNumber: "",
    password: ""
  });

  const [loginObj, setLoginObj] = useState({
    idNumber: "",
    password: ""
  });

  const navigate = useNavigate();

  const toggleForm = (form) => {
    setActiveForm(form);
  };

  const handleRegisterChange = (e) => {
    setRegisterObj({ ...registerObj, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginObj({ ...loginObj, [e.target.name]: e.target.value });
  };

  const registerForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:3001/register", registerObj, {
        headers: { "Content-Type": "application/json" }
      });
      toast.success("User successfully registered");
      toggleForm("login");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Error registering user");
    }
  };

  const loginForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:3001/login", loginObj, {
        headers: { "Content-Type": "application/json" }
      });
      const data = response.data;
      if (data.success) {
        toast.success("Login Successful");
        localStorage.setItem("loggedUser", JSON.stringify(data.token));
        localStorage.setItem("loggedUserId", JSON.stringify(loginObj.idNumber));
        if (data.role === "user") navigate("/dashboard");
        else if (data.role === "employee") navigate("/employee-dashboard");
      } else {
        toast.error("ID Number or Password is incorrect");
      }
    } catch (error) {
      console.error("Error during login", error);
      toast.error("Error logging in");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="heading">
        <h2>Log-in to Payments Portal</h2>
      </div>

      <div className="login-container">
        {/* REGISTER FORM
        {activeForm === "register" && (
          <form onSubmit={registerForm}>
            <h2>REGISTER</h2>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={registerObj.name}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={registerObj.surname}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="idNumber"
                placeholder="ID Number"
                value={registerObj.idNumber}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="accNumber"
                placeholder="Account Number"
                value={registerObj.accNumber}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerObj.password}
                onChange={handleRegisterChange}
              />
            </div>
            <button type="submit">Register</button>
            <p onClick={() => toggleForm("login")}>
              Already have an Account? <span className="highlighted">LOGIN</span>
            </p>
          </form>
        )} */}

        {/* LOGIN FORM */}
        {activeForm === "login" && (
          <form onSubmit={loginForm}>
            <h2>LOG-IN</h2>
            <div className="form-group">
              <input
                type="text"
                name="idNumber"
                placeholder="Username (ID Number)"
                value={loginObj.idNumber}
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginObj.password}
                onChange={handleLoginChange}
              />
            </div>
            <button type="submit">Log-in</button>

            {/* {<p onClick={() => toggleForm("register")}>
              Don't have an Account? <span className="highlighted">REGISTER</span>
            </p>} */}
          </form>
        )}
      </div>
    </div>
  );
}
