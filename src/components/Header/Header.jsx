import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import Logo from "../../assets/header/Cine_Sphere_logo.webp";
import menuIcon from "../../assets/header/menu-icon.svg";
import "./Header.css";
import SearchComponent from "../search/SearchComponent";
import apiClient from "../../api/apiClient";

gsap.registerPlugin(MorphSVGPlugin);

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [scrolled, setScrolled] = useState(false); // NEW

  const debounceTimer = useRef(null);
  const searchInput = useRef(null);

  const searchPath = useRef(null);
  const closePath = useRef(null);
  const icon = useRef(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      handleSearch(query);
    }, 500);
    return () => clearTimeout(debounceTimer.current);
  }, [query]);

  async function handleSearch(searchQuery) {
    setLoading(true);
    setSearched(true);
    try {
      const res = await apiClient.searchMovies(searchQuery);
      const data = res.data.results || [];
      setResults(data);
    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleToggle = () => {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("open");
    document
      .querySelector(".nav-toggle")
      .setAttribute("aria-expanded", nav.classList.contains("open"));
  };

  // Search icon morph
  function openSearch() {
    setShowSearch((prev) => {
      const newState = !prev;
      searchInput.current?.focus?.();
      gsap.to(icon.current, {
        duration: 0.4,
        ease: "power2.inOut",
        morphSVG: newState ? closePath.current : searchPath.current,
      });
      return newState;
    });
  }

  // Initialize GSAP icon state
  useEffect(() => {
    gsap.set(icon.current, {
      attr: { d: searchPath.current.getAttribute("d") },
    });
  }, []);

  // Lock body scroll when search is open
  useEffect(() => {
    if (showSearch) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [showSearch]);

  // NEW: mark header as scrolled when pageYOffset > 0
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.pageYOffset > 0);
    };
    // Initialize on mount so a refreshed mid-page reflects state
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // A simple threshold; adjust to a number like > 8 if needed

  const isActive = (path) => (currentPath === path ? "active" : "");

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link to="/" className="brand">
          <img src={Logo} className="logo" alt="cine-sphere-logo" />
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded="false"
          onClick={handleToggle}
        >
          <img src={menuIcon} className="menu" alt="menu" />
        </button>

        {/* Search Section */}
        <div className="search-container">
          <div className="input-container">
            <input
              type="text"
              className={`${showSearch ? "active" : ""}`}
              name="search"
              id="search"
              ref={searchInput}
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="searchicon" onClick={openSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path ref={icon} d="" />
                <path
                  ref={searchPath}
                  d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                  style={{ visibility: "hidden" }}
                />
                <path
                  ref={closePath}
                  d="M18 6L6 18M6 6l12 12"
                  style={{ visibility: "hidden" }}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <SearchComponent
        showSearch={showSearch}
        results={results}
        loading={loading}
        searched={searched}
        closeSearch={openSearch}
      />
    </header>
  );
}

export default Header;
