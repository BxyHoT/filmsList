import { Component } from "react";
import { Card } from "antd";
import { CSSProperties } from "react";
import { IMovie } from "../FilmList/FilmList";

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
    const { title, overview, realiseDate, posterPath } = movie;

    const getPoster = () => {
      if (posterPath !== "") {
        return <img src={posterPath} style={imgStyle} />;
      }
      return <div style={imgStyle}>картинки нет{`(`}</div>;
    };

    return (
      <Card style={cardStyle} cover={getPoster()}>
        <Card.Grid style={aboutStyle} hoverable={false}>
          <h2 style={{ fontSize: 20 }}>{title}</h2>
          <p style={{ fontSize: 12 }}>{realiseDate}</p>
          <p style={{ fontSize: 12 }}>{overview}</p>
        </Card.Grid>
      </Card>
    );
  }
}
