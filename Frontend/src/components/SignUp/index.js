import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  let url = "https://course-management-app-seven.vercel.app";

  const handleUsername = (event) => {
    setUsername(event.target.value);
    setUsernameError(""); // Clear error on input change
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    setEmailError(""); // Clear error on input change
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError(""); // Clear error on input change
  };

  const validateForm = () => {
    let isValid = true;

    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setUsernameError(
        "Username can only contain letters, numbers, dashes, and underscores."
      );
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setPasswordError(
        "Password must contain at least one uppercase, one lowercase, and one number."
      );
      isValid = false;
    }

    if (username === "" || password === "" || email === "") {
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    setErrorMessage("");
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${url}/api/auth/register/`, {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/login");
        setSuccessMessage("User Registered Succesfully");
      } else {
        console.error("Signup failed:", response.status, response.data);
        setErrorMessage(
          response.data.message || "SignUp failed, please try again."
        );
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  const handleToLogin = () => {
    navigate("/login");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="container">
        <input
          type="text"
          id="username"
          onChange={handleUsername}
          placeholder="Enter Your Username"
          className="input"
          value={username}
        />
        {usernameError && <div className="error-message">{usernameError}</div>}
      </div>
      <div className="container">
        <input
          type="email"
          id="email"
          onChange={handleEmail}
          placeholder="Enter Your Email"
          className="input"
          value={email}
        />
        {emailError && <div className="error-message">{emailError}</div>}
      </div>
      <div className="container">
        <input
          type="password"
          id="password"
          onChange={handlePassword}
          placeholder="Enter Your Password"
          className="input"
          value={password}
        />
        {passwordError && <div className="error-message">{passwordError}</div>}
      </div>
      {errorMessage && <div className="error-message"> {errorMessage}</div>}
      {successMessage && (
        <div className="success-message"> {successMessage}</div>
      )}
      <div className="btn-container">
        <button className="button" type="submit">
          Sign Up
        </button>
        <button className={`go-back-button button`} onClick={handleToLogin}>
          Go back to login
        </button>
      </div>
    </form>
  );
};

export default SignUp;
