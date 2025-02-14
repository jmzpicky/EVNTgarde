import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Logout from "./Logout";
import "./Home.css";

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().userType); 
        }
      } else {
        setRole(null);
      }
    });
  }, []);

  return (
    <div className="home-container">
      <header>
        <h1>Welcome to EVNTgarde</h1>
        <nav>
          {!user ? (
            // 🔹 Logged-out view (No roles yet)
            <>
              <Link to="/signup">Register</Link>
              <Link to="/login">Login</Link>
              <Link to="/book">Book</Link>
              <Link to="/about">Who We Are</Link>
            </>
          ) : (
            // 🔹 Logged-in view (With roles)
            <>
              <Link to="/book">Book</Link>
              <Link to="/about">Who We Are</Link>
              <Logout />
            </>
          )}
        </nav>
      </header>

      {user && role && (
        <aside className="sidebar">
          <h2>{role} Dashboard</h2>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Logout /></li>
          </ul>
        </aside>
      )}

      <footer>
        <p>© 2025 EVNTgarde. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
