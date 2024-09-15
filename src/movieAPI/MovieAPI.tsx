import { format, parseISO } from "date-fns";

interface IMovie {
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

export class MovieAPI {
  getTrimOwerview(overview: string) {
    const trimOwerview = overview.split(" ");
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWNiMGQzOTNhZWM4OTY3NzJiNjNhNDU1MTlkMzUxZiIsIm5iZiI6MTcyNTk3MjQwNC40Njg2NzgsInN1YiI6IjY2ZTAzYTJkMDAwMDAwMDAwMGE0NmFiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gBHXD4cjeOlAyUFuebJVVXxBNZFdWE1KSCl84IpTRXM",
      },
    };

    const resurce = await fetch(url, options);

    if (!resurce.ok) {
      throw new Error(`Ошибка ответа по урлу ${url}`);
    }
    return await resurce.json();
  }

  async getAllMovies(page = 1) {
    return await this.getResurce(
      `https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=${page}`
    )
      .then((movies) =>
        movies.results.map(
          ({
            id,
            overview,
            release_date,
            vote_average,
            popularity,
            poster_path,
            title,
            genre_ids,
          }: IMovie) => {
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
              overview: this.getTrimOwerview(overview),
              realiseDate: date,
              voteAverage: vote_average,
              posterPath: posterPath,
              genreIds: genre_ids,
            };
          }
        )
      )
      .catch((err) => {
        console.error("Ошибка фетча ", err);
      });
  }

  async getGenreArray() {
    return await this.getResurce(
      "https://api.themoviedb.org/3/genre/movie/list?language=en"
    ).then((genres) => genres.genres);
  }
}
