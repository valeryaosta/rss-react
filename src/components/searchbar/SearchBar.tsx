import React, { Component } from 'react';

type Props = {
  onSearch: (searchTerm: string) => void;
};

type State = {
  searchTerm: string;
};

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    this.props.onSearch(searchTerm.trim());
  };

  render() {
    return (
      <div>
        <input type='text' value={this.state.searchTerm} onChange={this.handleInputChange} />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
