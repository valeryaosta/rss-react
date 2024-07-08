import React, { Component } from 'react';
import SearchIcon from '../../assets/search.svg';
import './Searchbar.css';

type Props = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

type State = {
  searchTerm: string;
};

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: props.searchTerm };
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
      <div className='searchbar'>
        <input type='search' value={this.state.searchTerm} onChange={this.handleInputChange} className='input' />
        <button onClick={this.handleSearch} disabled={!this.state.searchTerm.trim()} className='search-btn'>
          <img src={SearchIcon} alt='search icon' />
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
