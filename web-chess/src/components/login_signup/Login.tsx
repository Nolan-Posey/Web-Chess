import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "") {
      alert("You must enter an email to a registered account to log in.");
    } else if (password === "") {
      alert("You must enter the password for the account to log in.");
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully");
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

  const handleRegisterRedirect = () => {
    navigate("/signup");
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
          Login
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
            width: "80%",
            maxWidth: "300px",
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
            width: "80%",
            maxWidth: "300px",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
            Login
          </button>
          <button
            onClick={handleRegisterRedirect}
            style={{ padding: "10px 20px" }}
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
