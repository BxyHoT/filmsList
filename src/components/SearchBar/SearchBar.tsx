import { Input } from "antd";
import { ChangeEvent, Component } from "react";
import debounce from "lodash.debounce";
import "./SearchBar.css";
import { ConfigProvider } from "antd";

const { Search } = Input;

interface ISearchBarProps {
  handleChengeSearchType: (value: string) => void;
}

export class SearchBar extends Component<ISearchBarProps> {
  onChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const { handleChengeSearchType } = this.props;
    handleChengeSearchType(event.target.value);
  }, 1500);

  componentWillUnmount(): void {
    this.props.handleChengeSearchType("return");
  }

  render() {
    return (
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 6,
          },
        }}
      >
        <Search
          style={{ marginBottom: 20, borderRadius: 6 }}
          placeholder="Type to search..."
          onChange={this.onChange}
        />
      </ConfigProvider>
    );
  }
}
