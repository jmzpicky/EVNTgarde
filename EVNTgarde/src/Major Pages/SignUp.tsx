import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCredentials from "./Sub Pages/AccountCredentials";
import AccountPassword from "./Sub Pages/AccountPassword";
import AccountPreferences from "./Sub Pages/AccountPreferences";
import "./SignUp.css";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import {
  OAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("Customer");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [industry, setIndustry] = useState("");
  const [services, setServices] = useState("");

  const googleProvider = new GoogleAuthProvider();
  const yahooProvider = new OAuthProvider("yahoo.com");

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
  
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Prepare user data
      const userData: Record<string, any> = {
        userType,
        email,
        phone,
      };
  
      if (userType === "Customer") {
        userData.firstName = firstName;
        userData.lastName = lastName;
      } else if (userType === "Organizer") {
        userData.companyName = companyName;
      } else if (userType === "Vendor") {
        userData.businessName = businessName;
        userData.businessType = businessType;
      }
  
      // Save user data in Firestore using the user's UID
      await setDoc(doc(db, "users", user.uid), userData);
  
      console.log("User data saved to Firestore:", userData);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleOAuthSignIn = async (
    provider: GoogleAuthProvider | OAuthProvider
  ) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;

      if (!userEmail) {
        throw new Error("Unable to retrieve email.");
      }

      // Check Firestore if the user already exists
      const usersRef = collection(db, "users"); // "users" to match Firestore
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No account found. Please sign up first.");
      }

      alert(`Signed in as ${userEmail}`);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>Account created successfully!</p>
      )}

      <form onSubmit={handleSignUp}>
        <AccountCredentials
          {...{
            userType,
            setUserType,
            email,
            setEmail,
            phone,
            setPhone,
            firstName,
            setFirstName,
            lastName,
            setLastName,
            companyName,
            setCompanyName,
            businessName,
            setBusinessName,
            businessType,
            setBusinessType,
          }}
        />
        <AccountPassword
          {...{
            password,
            setPassword,
            confirmPassword,
            setConfirmPassword,
            setPasswordError,
          }}
        />
        <AccountPreferences
          {...{
            userType,
            industry,
            setIndustry,
            services,
            setServices,
            preferences,
            setPreferences,
          }}
        />

        {passwordError && (
          <p className="error" style={{ color: "red" }}>
            {passwordError}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="login-link">
        Already have an account?{" "}
        <button onClick={() => navigate("/login")} className="login-button">
          Log In here
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

export default SignUp;
