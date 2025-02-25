import React, { useState, useEffect } from "react";
import {
  auth,
  signInWithPopup,
  googleProvider,
  yahooProvider,
} from "../firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  signOut,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkSessionExpiry();
  }, []);

  const checkSessionExpiry = () => {
    const loginTimestamp = localStorage.getItem("loginTimestamp");
    if (loginTimestamp) {
      const elapsedTime = Date.now() - parseInt(loginTimestamp, 10);
      if (elapsedTime > SESSION_DURATION) {
        signOut(auth).then(() => {
          localStorage.removeItem("loginTimestamp");
          console.log("Session expired. User logged out.");
          navigate("/login");
        });
      }
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await setPersistence(
        auth,
        keepLoggedIn ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithEmailAndPassword(auth, email, password);

      if (keepLoggedIn) {
        localStorage.setItem("loginTimestamp", Date.now().toString());
      }

      navigate("/home"); // Redirect after login
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: any) => {
    try {
      await setPersistence(
        auth,
        keepLoggedIn ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithPopup(auth, provider);

      if (keepLoggedIn) {
        localStorage.setItem("loginTimestamp", Date.now().toString());
      }

      navigate("/home");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Log In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <div className="password-row">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="show-hide-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="keepLoggedIn"
            checked={keepLoggedIn}
            onChange={() => setKeepLoggedIn(!keepLoggedIn)}
          />
          <label htmlFor="keepLoggedIn">Keep me logged in</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")} className="signup-button">
          Sign Up here
        </button>
      </p>

      <div className="oauthContainer">
        <button
          className="oauthButton googleButton"
          onClick={() => handleOAuthSignIn(googleProvider)}
        >
          Sign in with Google
        </button>
        <button
          className="oauthButton yahooButton"
          onClick={() => handleOAuthSignIn(yahooProvider)}
        >
          Sign in with Yahoo
        </button>
      </div>
    </div>
  );
};

export default Login;
