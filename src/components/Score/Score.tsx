import { Component, ReactNode } from "react";
import { Progress } from "antd";

interface IScoreProps {
  score: number;
}

export class Score extends Component<IScoreProps> {
  render(): ReactNode {
    const score = this.props.score;
    console.log(score);

    let strokeColor: string = "";
    if (score < 3) strokeColor = "#E90000";
    if (score < 5 && score >= 3) strokeColor = "#E97E00";
    if (score < 7 && score >= 5) strokeColor = "#E9D100";
    if (score >= 7) strokeColor = "#66E900";

    return (
      <Progress
        type="circle"
        size={40}
        strokeColor={strokeColor}
        format={(percent) => percent! / 10}
        percent={Number(score.toFixed(1)) * 10}
      />
    );
  }
}
