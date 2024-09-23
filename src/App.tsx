import { Component, ReactNode } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { FilmList } from "./components/FilmList/FilmList";
import { Tabs } from "antd";
import "./App.css";

interface IAppState {
  searchType: string;
}
class App extends Component<object, IAppState> {
  state = { searchType: "return" };

  handleChengeSearchType = (value: string) => {
    this.setState({ searchType: value });
  };

  render(): ReactNode {
    const { searchType } = this.state;

    return (
      <Tabs
        centered
        items={[
          {
            key: "1",
            label: "Search",
            children: (
              <>
                <SearchBar
                  handleChengeSearchType={this.handleChengeSearchType}
                />
                <FilmList searchType={searchType} />
              </>
            ),
          },
          { key: "2", label: "Rated", children: "Будет контент" },
        ]}
      />
    );
  }
}

export default App;
