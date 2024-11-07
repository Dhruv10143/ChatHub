import React, { useRef, useState, useContext } from 'react';
import './Authen.css';
import { AccountContext } from '../Context/AccountProvider';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { addUser } from '../../Service/Api';
import "react-toastify/dist/ReactToastify.css";
import img2 from "../img/img2.jpeg";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const LoginDialog = () => {
  const [login, setLogin] = useState(false);
  const { setAccount } = useContext(AccountContext);

  const cont = useRef(null);

  // State for user sign-up and login data
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [client, setClient] = useState({
    user_email: "",
    user_password: ""
  });

  // Handle Google login success
  const handleGoogleLogin = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setAccount(decoded);  // Set Google account data
    await addUser(decoded); // Send Google account data to backend
    toast.success("Registered/Logged in with Google!", { theme: "dark" });
  };

  // Handle manual sign-up form submission
  const handleSignUp = async (event) => {
    event.preventDefault();

    const manualAccount = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
      password: user.password,
      picture: "", // Optional: set a default profile picture or leave blank
    };

    setAccount(manualAccount); // Update account context
    await addUser(manualAccount); // Add to database or API
    toast.success("Registered successfully!", { theme: "dark" });
  };

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loginData = {
        email: client.user_email,
        password: client.user_password,
        login: true, // Indicate it's a login request
      };

      const response = await addUser(loginData); // Use addUser to check credentials

      if (response.success) {
        // Check if the response indicates a successful login
        const userAccount = response.user; // Retrieve user data
        setAccount(userAccount); // Update account context
        toast.success("Welcome back!", { theme: "dark" });
        setLogin(true);
      } else {
        toast.error("Invalid email or password. Please try again.", { theme: "dark" });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.", { theme: "dark" });
    }
  };

  // Handle input change for both sign-up and login forms
  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Switch between login and sign-up forms
  const switchTabs = (tabs) => {
    if (tabs === "login") {
      cont.current.classList.remove("sign-up-mode");
    } else {
      cont.current.classList.add("sign-up-mode");
    }
  };

  return (
    <>
      <div className="container_login" ref={cont}>
        <div className="forms-container">
          <div className="signin-signup">
            {/* Login Form */}
            <form className="sign-in-form" onSubmit={handleLogin}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                <input
                  type="email"
                  name="user_email"
                  value={client.user_email}
                  onChange={(e) => handleInputChange(e, setClient)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-field">
                <i><FontAwesomeIcon icon={faLock} /></i>
                <input
                  type="password"
                  name="user_password"
                  value={client.user_password}
                  onChange={(e) => handleInputChange(e, setClient)}
                  placeholder="Password"
                  required
                />
              </div>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Google login failed", { theme: "dark" })}
              />
              <button type="submit" className="btn_signin transparent-2">
                Sign In
              </button>
            </form>

            {/* Sign-up Form */}
            <form className="sign-up-form" onSubmit={handleSignUp}>
              <h2 className="title">Sign-up</h2>
              <div className="input-field">
                <i><FontAwesomeIcon icon={faUser} /></i>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={(e) => handleInputChange(e, setUser)}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="input-field">
                <i><FontAwesomeIcon icon={faUser} /></i>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={(e) => handleInputChange(e, setUser)}
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="input-field">
                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => handleInputChange(e, setUser)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-field">
                <i><FontAwesomeIcon icon={faLock} /></i>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => handleInputChange(e, setUser)}
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="btn_signin transparent-2">
                Register
              </button>
            </form>
          </div>
        </div>

        {/* Panels for switching views */}
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <img src={img2} className="image" alt="Login" />
              <p>New to <strong>Chat Hub?</strong></p>
              <h3><strong>Signup Now</strong></h3>
              <button
                className="btn_signin transparent"
                onClick={() => switchTabs("register")}
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <img src={img2} className="image" alt="Signup" />
              <p>Already a <strong>ChatHub Member?</strong></p>
              <h3><strong>Login Now</strong></h3>
              <button
                className="btn_signin transparent"
                onClick={() => switchTabs("login")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginDialog;
