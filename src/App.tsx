import { Component, ReactNode } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { FilmList } from "./components/FilmList/FilmList";
import { Tabs } from "antd";
import "./App.css";
import { IGenre } from "./movieAPI/MovieAPI";

interface IAppState {
  searchType: string;
  type: string;
  guestSessionId: string;
  genreList: IGenre[] | null;
}
class App extends Component<object, IAppState> {
  state = {
    searchType: "return",
    type: "1",
    guestSessionId: "Error",
    genreList: null,
  };

  handleChengeSearchType = (value: string) => {
    this.setState({ searchType: value });
  };

  handleSetGuestSession = (session: string) => {
    this.setState({ guestSessionId: session });
  };

  handleSetGenreList = (genreList: null | IGenre[]) => {
    this.setState({ genreList: genreList });
  };

  render(): ReactNode {
    const { searchType, type, guestSessionId, genreList } = this.state;

    return (
      <Tabs
        centered
        destroyInactiveTabPane
        onChange={(key) => {
          this.setState({ type: key });
        }}
        items={[
          {
            key: "1",
            label: "Search",
            children: (
              <>
                <SearchBar
                  handleChengeSearchType={this.handleChengeSearchType}
                />
                <FilmList
                  searchType={searchType}
                  type={type}
                  guestSession={guestSessionId}
                  handleSetGuestSession={this.handleSetGuestSession}
                  handleSetGenreList={this.handleSetGenreList}
                  genreList={genreList}
                />
              </>
            ),
          },
          {
            key: "2",
            label: "Rated",
            children: (
              <FilmList
                type={type}
                guestSession={guestSessionId}
                genreList={genreList}
              />
            ),
          },
        ]}
      />
    );
  }
}

export default App;
