import React, { useEffect, useState, useCallback } from "react";
import "./components/style.css";
import Animelist from "./components/Animelist";
import Animeinfo from "./components/AnimeInfo";
import AddToList from "./components/AddToList";
import RemoveFromList from "./components/RemoveFromList";

const App = () => {
  const [search, setSearch] = useState("");
  const [animeData, setAnimeData] = useState([]);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [myAnimeList, setMyAnimeList] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter(
      (myanime) => myanime.mal_id !== anime.mal_id
    );
    setMyAnimeList(newArray);
  };

  const addTo = (anime) => {
    const alreadyAdded = myAnimeList.findIndex(
      (myanime) => myanime.mal_id === anime.mal_id
    );
    if (alreadyAdded !== -1) return;

    setMyAnimeList([...myAnimeList, anime]);
  };

  const handleSearch = useCallback(async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${search}&sfw`
      );
      const data = await response.json();
      setAnimeData(data.data || []);
    } catch (error) {
      console.error("Error fetching anime:", error);
      setAnimeData([]);
    }
  }, [search]);

  useEffect(() => {
    const loadDefault = async () => {
      const defaultAnime = "Naruto";
      setSearch(defaultAnime);

      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${defaultAnime}&sfw`
        );
        const data = await response.json();
        setAnimeData(data.data || []);
      } catch (error) {
        console.error("Error fetching default anime:", error);
      }
    };

    loadDefault();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const sortedAnime = [...animeData].sort((a, b) => {
    switch (sortOption) {
      case "score":
        return (b.score || 0) - (a.score || 0);
      case "title":
        return a.title.localeCompare(b.title);
      case "episodes":
        return (b.episodes || 0) - (a.episodes || 0);
      default:
        return 0;
    }
  });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="header">
        <h1>My Anime List</h1>

        <div className="search-box">
          <input
            type="search"
            placeholder="Search Your Anime"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="search-button" onClick={handleSearch}>
            Search
          </button>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-dropdown"
          >
            <option value="">Sort By</option>
            <option value="score">Score (High → Low)</option>
            <option value="title">Title (A → Z)</option>
            <option value="episodes">Episodes (High → Low)</option>
          </select>
        </div>

        <button className="dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="container">
        <div className="animeInfo">
          {animeInfo && <Animeinfo animeInfo={animeInfo} />}
        </div>

        <div className="anime-row">
          <h2 className="text-heading">Anime</h2>
          <div className="row">
            <Animelist
              animelist={sortedAnime}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={addTo}
            />
          </div>

          <h2 className="text-heading">My List</h2>
          <div className="row">
            <Animelist
              animelist={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              animeComponent={RemoveFromList}
              handleList={removeFrom}
            />
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a className="footer-link" href="#">About</a>
            <a className="footer-link" href="#">Contact</a>
            <a className="footer-link" href="#">Privacy Policy</a>
          </div>
          <p>© 2026 My Anime List. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;