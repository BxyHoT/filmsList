import { Component, ReactNode } from "react";
import { MovieAPI } from "./movieAPI/MovieAPI";
import { Loader } from "./components/Loader/Loader";

import "./App.css";

interface IGenreList {
  id: number;
  name: string;
}
interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IAppState {
  movieList: null | IMovie[];
  genreList: null | IGenreList[];
  loading: boolean;
}

class App extends Component<object, IAppState> {
  movieAPI = new MovieAPI();

  state = {
    movieList: null,
    genreList: null,
    loading: true,
  };

  componentDidMount() {
    this.movieAPI.getAllMovies().then((movies) => {
      this.setState({ movieList: movies });
    });

    this.movieAPI.getGenreArray().then((genres) => {
      this.setState({
        genreList: genres,
        loading: false,
      });
    });
  }

  render(): ReactNode {
    const { movieList, genreList, loading } = this.state;

    if (loading) return <Loader />;
    return <></>;
  }
}

export default App;
