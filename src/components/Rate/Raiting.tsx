import { Component, ReactNode } from "react";
import { Rate } from "antd";
import { GenreConsumer } from "../Context/Context";
import { Alert } from "antd";
import { IRated } from "../../movieAPI/MovieAPI";

interface IRaitingProps {
  id: number;
  rated: IRated[] | null;
}
export class Raiting extends Component<IRaitingProps> {
  state = {
    scoreValue: 0,
  };

  render(): ReactNode {
    return (
      <GenreConsumer>
        {(values) => {
          if (this.props.rated !== null) {
            this.props.rated.forEach(({ id: idRated, rating }) => {
              if (idRated === this.props.id) {
                this.setState({ scoreValue: rating });
              }
            });
          }

          let error: null | string = null;

          if (values?.guestSession === "Error") {
            error = values.guestSession;
          }

          return (
            <>
              <Rate
                count={10}
                allowHalf={true}
                value={this.state.scoreValue}
                onChange={(value) => {
                  if (values?.guestSession !== "Error" && value > 0) {
                    this.setState({ scoreValue: value });
                    values?.setScore(value, this.props.id, values.guestSession);
                  }
                }}
              />
              {error && (
                <Alert
                  type="warning"
                  message="ОЦЕНКИ НЕ БУДЕТ"
                  closable
                ></Alert>
              )}
            </>
          );
        }}
      </GenreConsumer>
    );
  }
}
