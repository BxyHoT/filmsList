import { Component, ReactNode } from "react";
import { BeatLoader } from "react-spinners";
import "./Loader.css";

export class Loader extends Component {
  render(): ReactNode {
    return (
      <div className="Loader">
        <BeatLoader size={40}></BeatLoader>
      </div>
    );
  }
}
