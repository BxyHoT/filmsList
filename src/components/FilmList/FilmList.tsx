import { Component } from "react";
import { Row, Pagination } from "antd";
import { FilmListItem } from "../FilmListItem/FilmListItem";
import { MovieAPI } from "../../movieAPI/MovieAPI";
import { Spin } from "antd";
import { Alert } from "antd";
import { IMovieResponce } from "../../movieAPI/MovieAPI";

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
  isEmptyResponce: boolean;
}
export class FilmList extends Component<object, IFilmListState> {
  movieAPI = new MovieAPI();

  state = {
    movieList: [],
    loading: true,
    error: false,
    currentPage: 1,
    totalPages: null,
    isEmptyResponce: false,
  };

  onError = () => {
    console.log("error yopta");
    this.setState({ error: true, loading: false });
  };

  onLoaded = ({ movieList, totalPages }: IMovieResponce) => {
    if (movieList.length === 0) {
      this.setState({
        movieList,
        totalPages,
        loading: false,
        error: false,
        isEmptyResponce: true,
      });
    } else {
      this.setState({
        movieList,
        totalPages,
        loading: false,
        error: false,
        isEmptyResponce: false,
      });
    }
  };

  ITEMS_PER_PAGE = 20;

  handleChange = (page: number) => {
    window.scrollTo(0, 0);

    this.setState({ loading: true, currentPage: page });
  };

  componentDidMount() {
    this.movieAPI
      .getAllMovies()
      .then((response) => this.onLoaded(response as IMovieResponce))
      .catch(this.onError);
  }

  componentDidUpdate(prevProps, prevState: IFilmListState) {
    if (this.state.currentPage !== prevState.currentPage) {
      this.movieAPI
        .getAllMovies(this.state.currentPage)
        .then((response) => this.onLoaded(response as IMovieResponce))
        .catch(this.onError);
    }
  }

  render() {
    const {
      currentPage,
      movieList,
      loading,
      error,
      totalPages,
      isEmptyResponce,
    } = this.state;

    if (loading) {
      return <Spin size="large" tip="Loading..." fullscreen={true}></Spin>;
    }

    if (error) {
      return <Alert type="error" message="Ошибка запроса" closable />;
    }

    return (
      <div className="FilmList">
        {isEmptyResponce && (
          <Alert
            type="warning"
            description="Нет такого фильма("
            closable
          ></Alert>
        )}
        <Row gutter={[16, 16]}>
          <FilmListItem films={movieList} />
        </Row>
        <Pagination
          current={currentPage}
          pageSize={this.ITEMS_PER_PAGE}
          align="center"
          style={{ marginTop: 16 }}
          onChange={this.handleChange}
          total={totalPages as unknown as number}
          showSizeChanger={false}
          hideOnSinglePage={isEmptyResponce}
        />
      </div>
    );
  }
}
