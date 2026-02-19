import React, { useEffect, useState } from "react";
import "./components/style.css";
import Animelist from "./components/Animelist";
import Animeinfo from "./components/AnimeInfo";
import AddToList from "./components/AddToList";
import RemoveFromList from "./components/RemoveFromList";

const App = () => {
  const [search, setSearch] = useState("");
  const [animeData, setAnimeData] = useState([]);
  const [animeInfo, setAnimeInfo] = useState([]);
  const [myAnimeList, setMyAnimeList] = useState([]);

  const removeFrom=(anime) => {
    const newArray=myAnimeList.filter((myanime) => {
      return myanime.mal_id !== anime.mal_id;
    });
    setMyAnimeList(newArray);
  }

  const addTo=(anime) => {
    const alreadyAdded=myAnimeList.findIndex((myanime) => {
      return myanime.mal_id === anime.mal_id;
    });
    if(alreadyAdded !== -1) return;
    const newArray=[...myAnimeList, anime]
    setMyAnimeList(newArray);
  }

 const handleSearch = async () => {
    if (!search) return;
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${search}&sfw`,
      );
      const data = await response.json();
      console.log('API Response:', data);
      setAnimeData(data.data || []);
    } catch (error) {
      console.error('Error fetching anime:', error);
      setAnimeData([]);
    }
  };

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
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="container">
        <div className="animeInfo">
          {animeInfo && <Animeinfo animeInfo={animeInfo} />}
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Anime</h2>
          <div className="row">
            <Animelist
              animelist={animeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddToList}
              handleList={(anime) => addTo(anime)}
            />
          </div>
          <h2 className="text-heading">My List</h2>
          <div className="row">
            <Animelist
              animelist={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              animeComponent={RemoveFromList}
              handleList={(anime) => removeFrom(anime)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
