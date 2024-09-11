import { Component } from "react";
import { Row, Pagination } from "antd";
import "./FilmList.css";
import { IMovie } from "../../App";

export interface IMovieWithGenres extends Omit<IMovie, "genreIds"> {
  genreNames: string[];
}
interface IFilmListProps {
  movieList: IMovieWithGenres[];
}
export class FilmList extends Component<IFilmListProps> {
  state = {
    currentPage: 1,
  };

  ITEMS_PER_PAGE = 10;

  handleChange = (page: number) => {
    this.setState({ curentPage: page });
  };

  render() {
    const { currentPage } = this.state;

    return (
      <div>
        <Row gutter={[16, 16]}></Row>
        <Pagination
          current={currentPage}
          pageSize={this.ITEMS_PER_PAGE}
          align="center"
          style={{ marginTop: 16 }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
