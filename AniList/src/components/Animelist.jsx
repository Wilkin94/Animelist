import React from 'react'

const Animelist = ({animelist, setAnimeInfo}) => {
  return (
    <>
    {
        animelist ? ( 
            animelist.map((anime, index) => {
              return (
                <div className="card" onClick={() => setAnimeInfo(anime)} key={index}>
                    <img src={anime.images.jpg.large_image_url} alt="animeImage" />
                    <div className="anime-info">
                        <h4>{anime.title}</h4>
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