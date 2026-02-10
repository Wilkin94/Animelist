import React, { useEffect, useState } from "react";
import "./components/style.css";
import Animelist from "./components/Animelist";
import Animeinfo from "./components/AnimeInfo";

const App = () => {
  const { search, setSearch } = useState("Naruto");
  const [animeData, setAnimeData] = useState([]);
  const [animeInfo, setAnimeInfo] = useState([]);

  useEffect(() => {
    const fetchAnime = async () => {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?type=ova`,
      );
      const data = await response.json();
      setAnimeData(data.data);
    };
    fetchAnime();
  }, [search]);

  return (
    <>
      <div className="header">
        <h1>My Anime List</h1>
        <div className="search-box">
          <input
            type="search"
            placeholder="Search Your Anime"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        <div className="animeInfo">
          {animeInfo && <Animeinfo animeInfo={animeInfo} />}
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Anime</h2>
          <div className="row">
            <Animelist animelist={animeData}
            setAnimeInfo={setAnimeInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
