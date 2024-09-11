export class MovieAPI {
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

    return await resurce.json();
  }

  async getAllMovies(page = 1) {
    return await this.getResurce(
      `https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=${page}`
    ).then((movies) => movies.results);
  }

  async getGenreArray() {
    return await this.getResurce(
      "https://api.themoviedb.org/3/genre/movie/list?language=en"
    ).then((genres) => genres.genres);
  }
}
