import { Component } from 'react';
import SearchBar from './components/searchbar/SearchBar';
import CharacterList from './components/characterList/CharacterList';

interface Props {}

interface State {
  searchTerm: string;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearchTerm,
    };
  }

  handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);
    this.setState({ searchTerm });
  };

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
        <CharacterList searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}

export default App;
