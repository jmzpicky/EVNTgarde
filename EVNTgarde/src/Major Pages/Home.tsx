import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import Logout from "./Logout";
import "./Home.css";

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Mumbai");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example: Fetch events from Firestore based on search
    const db = getFirestore();
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("location", "==", location)); // Filter by location

    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("Search Results:", results); // Debugging

    // Redirect to search results page (optional)
    navigate(`/search?query=${searchQuery}&location=${location}`);
  };

  return (
    <div className="home-container">
      <header>
        <h1>Welcome to EVNTgarde</h1>
        <nav>
          {!user ? (
            <>
              <Link to="/signup">Register</Link>
              <Link to="/login">Login</Link>
              <Link to="/book">Book</Link>
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

      {/* Search Bar Section */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Events, Categories, Location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </div>

      <footer>
        <p>© 2025 EVNTgarde. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
