import React from "react";

const AnimeInfo = (props) => {
  // Guard clause for the main object
  if (!props.animeInfo) return null;

  // Destructure with a default empty object for images to prevent "undefined" errors
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
  } = props.animeInfo;

  // Use optional chaining to safely access the nested image URL
  const imageUrl = images.jpg?.large_image_url;

  return (
    <>
      <div className="anime-content">
        <h3>{title}</h3>
        <br />
        <img src={imageUrl} alt="animeImage" />
        <br />
        <br />
        <div className="info">
          <h3>#Rank: {rank}</h3>
          <h3>Score: {score}</h3>
          <h3>Popularity: {popularity}</h3>
          <hr />
          <br />
          <h3>Members: {members}</h3>
          <h3>Source: {source}</h3>
          <h3>Duration: {duration}</h3>
          <h3>Status: {status}</h3>
          <h3>Rating: {rating}</h3>
        </div>
      </div>
    </>
  );
};

export default AnimeInfo;
