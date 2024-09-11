import { Component } from "react";
import { IMovieWithGenres } from "../FilmList/FilmList";
import { Col } from "antd";

interface IFilmListItemProps {
  films: IMovieWithGenres[];
}

export class FilmItemList extends Component<IFilmListItemProps> {
  render() {
    const { films } = this.props;
    const filmList = films.map(({ id }) => {
      <Col span={12} key={id}></Col>;
    });

    return <>{filmList}</>;
  }
}
