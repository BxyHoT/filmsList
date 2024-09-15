import { Component, ReactNode } from "react";

import { FilmList } from "./components/FilmList/FilmList";

import "./App.css";

class App extends Component {
  render(): ReactNode {
    return <FilmList />;
  }
}

export default App;
