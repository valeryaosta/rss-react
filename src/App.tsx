import { Component } from 'react';
import SearchBar from './components/searchbar/SearchBar';

interface Props {}

interface State {
  searchTerm: string;
}

class App extends Component<Props, State> {
  state: State = {
    searchTerm: '',
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} />
      </div>
    );
  }
}

export default App;
