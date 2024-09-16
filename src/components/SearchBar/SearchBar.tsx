import { Input } from "antd";
import { Component } from "react";

const { Search } = Input;

export class SearchBar extends Component {
  render() {
    return (
      <Search style={{ marginBottom: 20 }} placeholder="Type to search..." />
    );
  }
}
