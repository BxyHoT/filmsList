import { Component } from "react";
import { Card } from "antd";
import { CSSProperties } from "react";
import { IMovie } from "../FilmList/FilmList";
import { GenreConsumer } from "../Context/Context";

interface ICardProps {
  movie: IMovie;
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
    const { movie } = this.props;
    const { title, overview, realiseDate, posterPath, genreIds } = movie;

    const getPoster = () => {
      if (posterPath !== "") {
        return <img src={posterPath} style={imgStyle} />;
      }
      return <div style={imgStyle}>картинки нет{`(`}</div>;
    };

    const isEmptyGenreIds = genreIds.length === 0;

    return (
      <GenreConsumer>
        {(genreList) => {
          return (
            <Card style={cardStyle} cover={getPoster()}>
              <Card.Grid style={aboutStyle} hoverable={false}>
                <h2 style={{ fontSize: 20, margin: 0, lineHeight: "28px" }}>
                  {title}
                </h2>
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

                    genreList?.forEach(({ name, id }) => {
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
              </Card.Grid>
            </Card>
          );
        }}
      </GenreConsumer>
    );
  }
}
