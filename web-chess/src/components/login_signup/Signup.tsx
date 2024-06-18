import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (email === "") {
      alert("You must enter an email.");
    } else if (password === "" || password.length < 8) {
      alert("You must enter a password that's at least 8 characters long.");
    } else if (confirmPassword === "") {
      alert("You must confirm your password.");
    } else if (password !== confirmPassword) {
      alert("Password and confirm password must match.");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully");
        navigate("/Home");
      } catch (error) {
        /*if (error instanceof Error) {
          alert(error.message);
        }*/
        alert(
          "Error: Could not log in user. \nPlease check your username and/or password."
        );
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "#6f6fa5", textShadow: "0.5px 0.5px 0.5px white" }}>
          Sign-up
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "100%",
            maxWidth: "500px",
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "100%",
            maxWidth: "500px",
          }}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "100%",
            maxWidth: "500px",
          }}
        />
        <button
          onClick={handleSignup}
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
