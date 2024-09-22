import { Component } from "react";
import { Row, Pagination } from "antd";
import { FilmListItem } from "../FilmListItem/FilmListItem";
import { MovieAPI } from "../../movieAPI/MovieAPI";
import { Spin } from "antd";
import { Alert } from "antd";
import { IMovieResponce, IGenre } from "../../movieAPI/MovieAPI";
import { GenreProvaider } from "../Context/Context";

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
  genreList: IGenre[] | null;
}

interface IFilmListProps {
  searchType: string;
}
export class FilmList extends Component<IFilmListProps, IFilmListState> {
  movieAPI = new MovieAPI();

  state = {
    movieList: [],
    loading: true,
    error: false,
    currentPage: 1,
    totalPages: null,
    isEmptyResponce: false,
    genreList: null,
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

  fetchByDefoult = () => {
    this.movieAPI
      .getAllMovies(this.state.currentPage, "return")
      .then((response) => this.onLoaded(response as IMovieResponce))
      .catch(this.onError);
  };

  componentDidMount() {
    this.movieAPI
      .getAllMovies()
      .then((response) => this.onLoaded(response as IMovieResponce))
      .catch(this.onError);

    this.movieAPI.getGenreArray().then((response) => {
      this.setState({ genreList: response });
    });
  }

  componentDidUpdate(prevProps: IFilmListProps, prevState: IFilmListState) {
    if (this.state.currentPage !== prevState.currentPage) {
      if (this.props.searchType === "") {
        this.fetchByDefoult();
      } else {
        this.movieAPI
          .getAllMovies(this.state.currentPage, this.props.searchType)
          .then((response) => this.onLoaded(response as IMovieResponce))
          .catch(this.onError);
      }
    }

    if (prevProps.searchType !== this.props.searchType) {
      this.setState({ currentPage: 1 });

      if (this.props.searchType === "") {
        this.fetchByDefoult();
      } else {
        this.movieAPI
          .getAllMovies(1, this.props.searchType)
          .then((response) => this.onLoaded(response as IMovieResponce))
          .catch(this.onError);
      }
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
      <GenreProvaider value={this.state.genreList}>
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
      </GenreProvaider>
    );
  }
}
