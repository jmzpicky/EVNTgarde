import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import Logout from "./Logout";
import "./Home.css";

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Mumbai");
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

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

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const db = getFirestore();
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("location", "==", location));
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Search Results:", results);
    navigate(`/search?query=${searchQuery}&location=${location}`);
  };

  const handleBookClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!user) {
      event.preventDefault();
      setShowModal(true);
    }
  };

  const handleModalResponse = (hasAccount: boolean) => {
    setShowModal(false);
    navigate(hasAccount ? "/login" : "/signup");
  };

  return (
    <div className={`home-container ${darkMode ? "dark" : "light"}`}>
      <header>
        <h1>Welcome to EVNTgarde</h1>
        <nav>
          {!user ? (
            <>
              <Link to="/signup">Register</Link>
              <Link to="/login">Login</Link>
              <Link to="/book" onClick={handleBookClick}>
                Book
              </Link>
              <Link to="/about">Who We Are</Link>
            </>
          ) : (
            <>
              <Link to="/book">Book</Link>
              <Link to="/about">Who We Are</Link>
              <Logout />
            </>
          )}
        </nav>
      </header>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>
              You need to have an account to book.
              <br />
              Do you already have an account?
            </p>
            <button onClick={() => handleModalResponse(true)}>Yes</button>
            <button onClick={() => handleModalResponse(false)}>No</button>
          </div>
        </div>
      )}

      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Events, Categories, Location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </div>

      {user && role && (
        <aside className="sidebar">
          <h2>{role} Dashboard</h2>
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/bookings">Bookings</Link>
            </li>
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </aside>
      )}

      <footer>
        <p>© 2025 EVNTgarde. All rights reserved.</p>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </footer>
    </div>
  );
};

export default Home;
