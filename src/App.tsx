import { Component, ReactNode } from "react";
// import CardList from "./components/test/test";
import { MovieAPI } from "./movieAPI/MovieAPI";

import "./App.css";

class App extends Component {
  render(): ReactNode {
    const movies = new MovieAPI();
    console.log(movies.getMovies());
    return <div></div>;
  }
}

export default App;
