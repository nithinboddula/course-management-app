import { useState } from "react";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };
  const validateForm = () => {
    let valid = true;
    if (!username) {
      setUsernameError("Username is required");
      valid = false;
    } else if (!/^[a-zA-Z0-9_-]{3,15}$/.test(username)) {
      setUsernameError(
        "Username must be 3-15 characters and may include letters, numbers, dashes, or underscores."
      );
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."
      );
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      return; //
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login/",
        { username, password }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        alert("login successfull");
        navigate("/Home");
      } else {
        console.error("Login failed:", response.status, response.data);
        setErrorMessage(
          response.data.message || "Login failed, please try again."
        );
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred."
      );
      console.error("Error during login:", error);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };
  return (
    <form name="login-form" className="form-container" onSubmit={handleSubmit}>
      <div className="container">
        <input
          type="username"
          onChange={handleUsername}
          placeholder="Enter Your Username"
          className="input"
          value={username}
        />
        {usernameError && (
          <div className="error-message"> * {usernameError}</div>
        )}
      </div>
      <div className="container">
        <input
          type="password"
          onChange={handlePassword}
          placeholder="Enter Your Password"
          className="input"
          value={password}
        />
        {passwordError && (
          <div className="error-message">* {passwordError}</div>
        )}
      </div>
      {errorMessage && <div className="error-message"> {errorMessage}</div>}

      <div className="btn-container">
        <button type="submit" className="button">
          Login
        </button>

        <p>or</p>

        <button className="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </form>
  );
};
export default Login;
