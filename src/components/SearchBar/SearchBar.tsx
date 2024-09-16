import { Input } from "antd";
import { ChangeEvent, Component } from "react";
import debounce from "lodash.debounce";
import "./SearchBar.css";

const { Search } = Input;

interface ISearchBarProps {
  handleChengeSearchType: (value: string) => void;
}

export class SearchBar extends Component<ISearchBarProps> {
  onChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const { handleChengeSearchType } = this.props;
    handleChengeSearchType(event.target.value);
  }, 1500);

  render() {
    return (
      <Search
        style={{ marginBottom: 20 }}
        placeholder="Type to search..."
        onChange={this.onChange}
      />
    );
  }
}
