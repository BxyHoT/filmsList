import { Component, ReactNode } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { FilmList } from "./components/FilmList/FilmList";
import "./App.css";

interface IAppState {
  searchType: null | string;
}
class App extends Component<object, IAppState> {
  state = { searchType: null };

  render(): ReactNode {
    return (
      <>
        <SearchBar></SearchBar>
        <FilmList />
      </>
    );
  }
}

export default App;
