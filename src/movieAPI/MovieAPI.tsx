import { format, parseISO } from "date-fns";
import { IMovie } from "../components/FilmList/FilmList";

interface MovieDTO {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieResponce {
  movieList: IMovie[] | [];
  totalPages: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export class MovieAPI {
  Authorization =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWNiMGQzOTNhZWM4OTY3NzJiNjNhNDU1MTlkMzUxZiIsIm5iZiI6MTcyNTk3MjQwNC40Njg2NzgsInN1YiI6IjY2ZTAzYTJkMDAwMDAwMDAwMGE0NmFiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gBHXD4cjeOlAyUFuebJVVXxBNZFdWE1KSCl84IpTRXM";

  getTrimOwerview(overview: string, title: string) {
    const trimOwerview = overview.split(" ");

    if (title.split(" ").length > 20) return "";

    if (trimOwerview.length > 30) {
      return trimOwerview.slice(0, 29).join(" ") + " ...";
    }

    return overview;
  }

  async getResurce(url: string) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: this.Authorization,
      },
    };

    const resurce = await fetch(url, options);

    if (!resurce.ok) {
      throw new Error(`Ошибка ответа по урлу ${url}`);
    }
    return await resurce.json();
  }

  async getAllMovies(page = 1, searchWord = "return") {
    return await this.getResurce(
      `https://api.themoviedb.org/3/search/movie?query=${searchWord}&include_adult=false&language=en-US&page=${page}`
    )
      .then((movies): IMovieResponce => {
        const totalPages: number = movies.total_results;

        if (movies.results.length === 0) {
          return {
            movieList: [],
            totalPages,
          };
        }

        const movieList = movies.results.map(
          ({
            id,
            overview,
            release_date,
            vote_average,
            popularity,
            poster_path,
            title,
            genre_ids,
          }: MovieDTO) => {
            let date: Date | string;

            if (release_date === "") {
              date = "No date";
            } else {
              date = parseISO(release_date);
              date = format(date, "MMMM d, yyyy");
            }

            let posterPath;

            if (poster_path === null) {
              posterPath = "";
            } else {
              posterPath = "https://image.tmdb.org/t/p/w500" + poster_path;
            }

            return {
              id,
              popularity,
              title,
              overview: this.getTrimOwerview(overview, title),
              realiseDate: date,
              voteAverage: vote_average,
              posterPath: posterPath,
              genreIds: genre_ids,
            };
          }
        );
        return {
          totalPages,
          movieList,
        };
      })
      .catch((err) => {
        console.error("Ошибка фетча ", err);
      });
  }

  getGenreArray = async () => {
    return await this.getResurce(
      "https://api.themoviedb.org/3/genre/movie/list?language=en"
    )
      .then((genres): IGenre[] => genres.genres)
      .catch((err) => {
        console.error("Ответ говна на жанрах", err);
        return null;
      });
  };

  guestSession = async (): Promise<string> => {
    return await this.getResurce(
      "https://api.themoviedb.org/3/authentication/guest_session/new"
    )
      .then((responce) => responce.guest_session_id)
      .catch((err) => {
        console.error("ошибочка" + err);
        return "Error";
      });
  };

  async setScore(score: string, guestSession: string, id: number) {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: this.Authorization,
      },
      body: JSON.stringify({ value: score }),
    };

    return await fetch(
      `https://api.themoviedb.org/3/movie/${id}}/rating?guest_session_id=${guestSession}`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  async getRaited(guestSession: string) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: this.Authorization,
      },
    };

    return await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSession}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }
}
