import { Component } from "react";
import { Card } from "antd";
import { CSSProperties } from "react";
import { IMovie } from "../FilmList/FilmList";
import { GenreConsumer } from "../Context/Context";
import { Raiting } from "../Rate/Raiting";
import { Score } from "../Score/Score";
import { IRated } from "../../movieAPI/MovieAPI";

interface ICardProps {
  movie: IMovie;
  rated: IRated[] | null;
}

const cardStyle: CSSProperties = {
  height: 300,
  borderRadius: 0,
  boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
};

const imgStyle: CSSProperties = {
  width: "35%",
  height: 300,
  borderRadius: "0",
  backgroundColor: "grey",
};

const aboutStyle: CSSProperties = {
  width: "65%",
  marginTop: -300,
  marginLeft: "35%",
};

export class FilmCard extends Component<ICardProps> {
  render() {
    const { movie, rated } = this.props;
    const {
      title,
      overview,
      realiseDate,
      posterPath,
      genreIds,
      voteAverage,
      id,
    } = movie;

    const getPoster = () => {
      if (posterPath !== "") {
        return <img src={posterPath} style={imgStyle} />;
      }
      return <div style={imgStyle}>картинки нет{`(`}</div>;
    };

    const isEmptyGenreIds = genreIds.length === 0;

    return (
      <GenreConsumer>
        {(value) => {
          return (
            <Card style={cardStyle} cover={getPoster()}>
              <Card.Grid style={aboutStyle} hoverable={false}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 style={{ fontSize: 20, margin: 0, lineHeight: "28px" }}>
                    {title}
                  </h2>
                  <Score score={voteAverage}></Score>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: "20px",
                    color: "rgba(130, 126, 126, 1)",
                    marginBottom: 5,
                  }}
                >
                  {realiseDate}
                </p>
                {!isEmptyGenreIds ? (
                  genreIds.map((genreId) => {
                    let genre = "";

                    value?.genreList?.forEach(({ name, id }) => {
                      if (id === genreId) {
                        genre = name;
                      }
                    });

                    return (
                      <span
                        key={genreId}
                        style={{
                          fontSize: 12,
                          border: "1px solid rgba(217, 217, 217, 1)",
                          borderRadius: 3,
                          display: "inline-block",
                          height: "20px",
                          padding: "0 5px",
                          marginRight: 5,
                        }}
                      >
                        {genre}
                      </span>
                    );
                  })
                ) : (
                  <p
                    style={{
                      fontSize: 12,
                      border: "1px solid rgba(217, 217, 217, 1)",
                      borderRadius: 3,
                      display: "inline-block",
                      height: "20px",
                      padding: "0 5px",
                      margin: 0,
                    }}
                  >
                    No genre
                  </p>
                )}
                <p style={{ fontSize: 12, marginTop: 5 }}>{overview}</p>
                <Raiting id={id} rated={rated}></Raiting>
              </Card.Grid>
            </Card>
          );
        }}
      </GenreConsumer>
    );
  }
}
