import { Component } from "react";
import { Row, Pagination } from "antd";
import "./FilmList.css";
import { IMovie } from "../../App";
import { FilmListItem } from "../FilmListItem/FilmListItem";

interface IFilmListProps {
  movieList: IMovie[];
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
    const { movieList } = this.props;
    const startIndex = (currentPage - 1) * this.ITEMS_PER_PAGE;
    const currentFilms = movieList.slice(
      startIndex,
      startIndex + this.ITEMS_PER_PAGE
    );

    return (
      <div className="FilmList">
        <Row gutter={[16, 16]}>
          <FilmListItem films={currentFilms} />
        </Row>
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
