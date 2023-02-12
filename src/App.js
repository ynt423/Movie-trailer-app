import "./App.css";
import axios from "axios";
import { createElement, useEffect, useState } from "react";
import Movie from "./components/Movie";
import YouTube from "react-youtube";

function App() {
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/original";
  const API_URL = "https://api.themoviedb.org/3/";
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [playTrailer, setPlayTrailer] = useState(false);
  /* --------------------------------------------------------------------------- */
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: "beb23379a63b8311937a7a112e5b88f3",
        query: searchKey,
      },
    });
    await selectMovie(results[0]);
    /*  setSelectedMovie(results[0]); */
    setMovies(results);
  };
  /* ---------------------------------------------------------------------------- */
  const fecthMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: "beb23379a63b8311937a7a112e5b88f3",
        append_to_response: "videos",
      },
    });
    return data;
  };
  /* --------------------------------------------------------------------------- */
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  /* ------------------------------------------------------------------------------- */
  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );

    return (
      <YouTube
        videoId={trailer.key}
        containerClassName={"youtube-container"}
        opts={{
          width: "100%",
          height: "800px",
          playerVars: { autoplay: 1, controls: 0 },
        }}
      />
    );
  };
  /* ----------------------------------------------------------------------------- */
  //for select trailer
  const selectMovie = async (movie) => {
    setPlayTrailer(false);
    const data = await fecthMovie(movie.id);
    console.log(`movie data`, data);
    setSelectedMovie(data);
  };
  /* ----------------------------------------------------------------------------- */
  useEffect(() => {
    fetchMovies();
  }, []);
  /* --------------------------------------------------------------------------------- */
  const renderMovies = () =>
    movies.map((movie) => (
      <Movie key={movie.id} movie={movie} selectedMovie={selectMovie} />
    ));

  return (
    <div className="App">
      <header className="header">
        <div className="header-content max-center">
          <span>Movie Trailer App</span>
          <form className="input-form" onSubmit={searchMovies}>
            <input
              className="input-text"
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            {/* {searchKey} for testing*/}
            <button type="submit">Search</button>
          </form>
        </div>
      </header>

      <div
        className="selection"
        style={{
          backgroundImage: ` url(${BACKDROP_PATH}${selectedMovie.backdrop_path})`,
        }}
      >
        <div className="selection-content max-center">
          {playTrailer ? (
            <button
              className="button button--close"
              onClick={() => setPlayTrailer(false)}
            >
              Close
            </button>
          ) : null}
          {selectedMovie.videos && playTrailer ? renderTrailer() : null}

          <button className="button" onClick={() => setPlayTrailer(true)}>
            Play Trailer
          </button>
          <h1 className="select-title">{selectedMovie.title}</h1>
          {selectedMovie.overview ? (
            <p className="select-overview">{selectedMovie.overview}</p>
          ) : null}
        </div>
      </div>
      <div className="container max-center">{renderMovies()}</div>
    </div>
  );
}

export default App;

/* style={{backgroundImage:`url(`${IMAGE_PATH}${selectedMovie.backdrop_path}`)`}} */
