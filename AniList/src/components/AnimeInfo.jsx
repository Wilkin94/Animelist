import React from "react";

const AnimeInfo = ({ animeInfo }) => {
  if (!animeInfo) return null;

  const {
    title,
    images = {},
    source,
    rank,
    score,
    popularity,
    members,
    status,
    rating,
    duration,
  } = animeInfo;

  const imageUrl = images.jpg?.large_image_url;

  return (
    <div className="anime-content">
      {/* ✅ TITLE ON TOP */}
      <h3 className="anime-title">{title}</h3>

      {/* ✅ IMAGE + INFO ROW */}
      <div className="anime-details">
        <img src={imageUrl} alt="animeImage" />

        <div className="info">
          <h3>#Rank: {rank}</h3>
          <h3>Score: {score}</h3>
          <h3>Popularity: {popularity}</h3>
          <hr />
          <h3>Members: {members}</h3>
          <h3>Source: {source}</h3>
          <h3>Duration: {duration}</h3>
          <h3>Status: {status}</h3>
          <h3>Rating: {rating}</h3>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfo;
