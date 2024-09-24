import { Component } from "react";
import { IMovie } from "../FilmList/FilmList";
import { Col } from "antd";
import { FilmCard } from "../Card/FilmCard";
import { IRated } from "../../movieAPI/MovieAPI";

interface IFilmListItemProps {
  films: IMovie[] | IRated[];
  rated: IRated[] | null;
}

export class FilmListItem extends Component<IFilmListItemProps> {
  render() {
    const { films, rated } = this.props;
    const filmList = films.map((movie) => (
      <Col span={12} key={movie.id}>
        <FilmCard movie={movie} rated={rated}></FilmCard>
      </Col>
    ));

    return <>{filmList}</>;
  }
}
