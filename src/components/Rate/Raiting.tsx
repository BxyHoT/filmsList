import { Component, ReactNode } from "react";
import { Rate } from "antd";

export class Raiting extends Component {
  render(): ReactNode {
    return <Rate count={10} allowHalf={true} />;
  }
}
