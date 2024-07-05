import { Component } from 'react';
import SearchBar from './components/searchbar/SearchBar';
import CharacterList from './components/characterList/CharacterList.tsx';

interface Props {}

interface State {
  searchTerm: string;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleSearch = (searchTerm: string) => {
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
