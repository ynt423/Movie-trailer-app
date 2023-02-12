import React from "react";

const Movie = ({ movie, selectedMovie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";
  /* scroll to top */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
       in place of 'smooth' */
    });
  };
  /* SCROLL */
  /*   const scrolldown = () => {
    return (
      <ScrollButton
        behavior="smooth"
        buttonBackgroundColor="red"
        iconType="arrowUp"
        style={{ fontSize: "24px" }}
      />
    );
  }; */
  console.log(movie);
  return (
    <div
      className={"movie-card"}
      onClick={() => {
        selectedMovie(movie);
        scrollToTop();
      }}
    >
      {movie.poster_path ? (
        <img
          className={"movie-cover"}
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt=""
        />
      ) : (
        <div className="movie-placeholder">No Image Found</div>
      )}
      <h5>{movie.title}</h5>
    </div>
  );
};

export default Movie;
