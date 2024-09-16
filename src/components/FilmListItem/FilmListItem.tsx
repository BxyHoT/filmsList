import { Component } from "react";
import { IMovie } from "../FilmList/FilmList";
import { Col } from "antd";
import { FilmCard } from "../Card/FilmCard";
import "./FilmListItem.css";

interface IFilmListItemProps {
  films: IMovie[];
}

export class FilmListItem extends Component<IFilmListItemProps> {
  render() {
    const { films } = this.props;
    const filmList = films.map((movie) => (
      <Col span={12} key={movie.id}>
        <FilmCard movie={movie}></FilmCard>
      </Col>
    ));

    return <>{filmList}</>;
  }
}
