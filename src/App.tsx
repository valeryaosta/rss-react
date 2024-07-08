import { Component } from 'react';
import SearchBar from './components/searchbar/SearchBar';
import CharacterList from './components/characterList/CharacterList';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import ButtonWithError from './components/buttonWithBug/ButtonWithError';
import './App.css';

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
    return (
      <ErrorBoundary fallback={<h1>Something went wrong. Please try again later.</h1>}>
        <div className='app-container'>
          <div className='searchbar-section'>
            <ButtonWithError />
            <SearchBar searchTerm={this.state.searchTerm} onSearch={this.handleSearch} />
          </div>
          <div className='characters-wrapper'>
            <CharacterList searchTerm={this.state.searchTerm} />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
