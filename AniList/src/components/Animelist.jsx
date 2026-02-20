import React from 'react'

const Animelist = ({animelist, setAnimeInfo, animeComponent, handleList}) => {

    const AddToList=animeComponent;

  return (
    <>
    {
        animelist ? ( 
            animelist.map((anime, index) => {
              return (
                <div className="card" onClick={() => {setAnimeInfo(anime)}} key={index}>
                    <img src={anime.images.jpg.large_image_url} alt="animeImage" />
                    <div className="overlay" onClick={(e) => {
  e.stopPropagation();
  handleList(anime);
}}>
  <h4>{anime.title_japanese}</h4>
  <h3>SYNOPSIS</h3>

  <div className="synopsis">
    <p>{anime.synopsis}</p>
  </div>

  <AddToList />
</div>
                </div>
              )
            })
        ) : "Not Found"
    }
    </>
  );
}

export default Animelist