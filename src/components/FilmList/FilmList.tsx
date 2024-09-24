import { Component } from "react";
import { Row, Pagination } from "antd";
import { FilmListItem } from "../FilmListItem/FilmListItem";
import { MovieAPI } from "../../movieAPI/MovieAPI";
import { Spin } from "antd";
import { Alert } from "antd";
import { IMovieResponce, IGenre, IRated } from "../../movieAPI/MovieAPI";
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
  guestSessionId: string;
  rated: null | IRated[];
}

interface IFilmListProps {
  searchType?: string;
  type: string;
  handleSetGuestSession?: (param: string) => void;
  guestSession: string;
  handleSetGenreList?: (param: null | IGenre[]) => void;
  genreList: null | IGenre[];
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
    guestSessionId: "",
    rated: null,
  };

  onError = () => {
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
    if (this.props.type === "1") {
      this.movieAPI
        .getAllMovies()
        .then((response) => this.onLoaded(response as IMovieResponce))
        .catch(this.onError);

      if (this.props.genreList === null) {
        this.movieAPI.getGenreArray().then((response) => {
          this.setState({ genreList: response });
          this.props.handleSetGenreList!(response);
        });
      } else {
        this.setState({ genreList: this.props.genreList });
      }

      if (this.props.guestSession === "Error") {
        this.movieAPI
          .guestSession()
          .then((id) => {
            this.setState({ guestSessionId: id });
            this.props.handleSetGuestSession!(id);
          })
          .catch((err) => {
            this.setState({ guestSessionId: err });
            this.props.handleSetGuestSession!(err);
          });
      } else {
        this.setState({ guestSessionId: this.props.guestSession });
        this.movieAPI
          .getRaited(this.props.guestSession, 1)
          .then((res) => {
            this.setState({ rated: res!.movieList, loading: false });
          })
          .catch(() => {
            this.setState({ rated: null, loading: false });
          });
      }
    } else
      this.setState({
        guestSessionId: this.props.guestSession,
        genreList: this.props.genreList,
      });

    this.movieAPI
      .getRaited(this.props.guestSession, 1)
      .then((res) => {
        this.setState({ rated: res!.movieList, loading: false });
      })
      .catch(() => {
        this.setState({ rated: null, loading: false });
      });
  }

  componentDidUpdate(prevProps: IFilmListProps, prevState: IFilmListState) {
    if (
      this.state.currentPage !== prevState.currentPage &&
      this.props.type === "1"
    ) {
      if (this.props.searchType === "") {
        this.fetchByDefoult();
      } else {
        this.movieAPI
          .getAllMovies(this.state.currentPage, this.props.searchType)
          .then((response) => this.onLoaded(response as IMovieResponce))
          .catch(this.onError);
      }

      this.movieAPI
        .getRaited(this.state.guestSessionId, 1)
        .then((res) => {
          this.setState({ rated: res!.movieList });
        })
        .catch(() => {
          this.setState({ rated: null });
        });
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
      guestSessionId,
      rated,
    } = this.state;

    if (loading) {
      return <Spin size="large" tip="Loading..." fullscreen={true}></Spin>;
    }

    if (error) {
      return <Alert type="error" message="Ошибка запроса" closable />;
    }

    console.log(guestSessionId);

    return (
      <GenreProvaider
        value={{
          genreList: this.state.genreList,
          setScore: this.movieAPI.setScore,
          guestSession: guestSessionId,
        }}
      >
        <div className="FilmList">
          {isEmptyResponce && (
            <Alert
              type="warning"
              description="Нет такого фильма("
              closable
            ></Alert>
          )}
          {this.props.type === "2" && !rated && (
            <Alert
              type="warning"
              description="Нет оцененных фильмов"
              closable
            ></Alert>
          )}
          <Row gutter={[16, 16]}>
            <FilmListItem
              films={this.props.type !== "2" ? movieList : rated ? rated : []}
              rated={rated}
            />
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
