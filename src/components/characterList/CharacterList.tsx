import { Component } from 'react';
import { getCharacters } from '../../api/api.ts';
import './CharacterList.css';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type Props = {
  searchTerm: string;
};

type State = {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
};

class CharacterList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      characters: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchCharacters(this.props.searchTerm);
    }
  }

  async fetchCharacters(searchTerm: string = '') {
    this.setState({ isLoading: true, error: null });
    try {
      const data = await getCharacters(1, searchTerm);
      this.setState({ characters: data.results, isLoading: false });
    } catch (error) {
      this.setState({ error: 'Failed to fetch characters', isLoading: false });
    }
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'green';
      case 'dead':
        return 'red';
      default:
        return 'gray';
    }
  }

  render() {
    const { characters, isLoading, error } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    return (
      <div className='character-list'>
        {characters.map((character) => (
          <div key={character.id} className='character-card'>
            <img src={character.image} alt={character.name} />
            <div className='character-info'>
              <p>{character.name}</p>
              <div className='status'>
                <span
                  className='status-indicator'
                  style={{ backgroundColor: this.getStatusColor(character.status) }}
                ></span>
                {character.status} - {character.species}
              </div>
              <p className='specific-text'>
                <span className='specific'>Last Known Location: </span>
                {character.location?.name}
              </p>
              <p className='specific-text'>
                <span className='specific'>First Seen In: </span>
                {character.origin?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CharacterList;
