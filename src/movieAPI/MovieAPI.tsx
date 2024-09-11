export class MovieAPI {
  async getMovies() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWNiMGQzOTNhZWM4OTY3NzJiNjNhNDU1MTlkMzUxZiIsIm5iZiI6MTcyNTk3MjQwNC40Njg2NzgsInN1YiI6IjY2ZTAzYTJkMDAwMDAwMDAwMGE0NmFiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gBHXD4cjeOlAyUFuebJVVXxBNZFdWE1KSCl84IpTRXM",
      },
    };

    const movies = await fetch(
      "https://api.themoviedb.org/3/account/21511753/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc",
      options
    );

    return await movies.json();
  }
}
