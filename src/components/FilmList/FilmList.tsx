import { Component } from "react";
import { Row, Pagination } from "antd";
import "./FilmList.css";
import { FilmListItem } from "../FilmListItem/FilmListItem";
import { MovieAPI } from "../../movieAPI/MovieAPI";

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

interface IFilmListState {
  movieList: IMovie[] | [];
  loading: boolean;
  error: boolean;
  currentPage: number;
  totalPages: number | null;
}
export class FilmList extends Component<object, IFilmListState> {
  movieAPI = new MovieAPI();

  state = {
    movieList: [],
    loading: true,
    error: false,
    currentPage: 1,
    totalPages: null,
  };

  componentDidMount() {
    this.movieAPI.getAllMovies().then(({ movieList, totalPages }) => {
      this.setState({ movieList, totalPages });
    });
  }

  ITEMS_PER_PAGE = 20;

  handleChange = (page: number) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage, movieList, loading, error, totalPages } = this.state;
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
          total={totalPages as unknown as number}
        />
      </div>
    );
  }
}
