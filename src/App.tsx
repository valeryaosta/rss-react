import { Component } from 'react';
import SearchBar from './components/searchbar/SearchBar';
import CharacterList from './components/characterList/CharacterList';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import ButtonWithError from './components/buttonWithBug/ButtonWithError';

interface Props {}

interface State {
  searchTerm: string;
  throwError: boolean;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearchTerm,
      throwError: false,
    };
  }

  handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);
    this.setState({ searchTerm });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Test error');
    }

    return (
      <ErrorBoundary fallback={<h1>Something went wrong. Please try again later.</h1>}>
        <div className='app-container'>
          <SearchBar onSearch={this.handleSearch} />
          <ButtonWithError />
          <CharacterList searchTerm={this.state.searchTerm} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
