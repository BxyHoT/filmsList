import { Component, ReactNode } from "react";
import { MovieAPI } from "./movieAPI/MovieAPI";
import { Loader } from "./components/Loader/Loader";
import { FilmList } from "./components/FilmList/FilmList";

import "./App.css";

interface IGenreList {
  id: number;
  name: string;
}
export interface IMovie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  realiseDate: string;
  voteAverage: number;
  posterPath: string;
  genreIds: number[];
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

    return <FilmList movieList={movieList as unknown as IMovie[]} />;
  }
}

export default App;
