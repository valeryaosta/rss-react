import { Component } from 'react';
import { getCharacters } from '../../api/api.ts';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
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

  render() {
    const { characters, isLoading, error } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    return (
      <div>
        {characters.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
            <p>species: {character.species}</p>
            <p>status: {character.status}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default CharacterList;
