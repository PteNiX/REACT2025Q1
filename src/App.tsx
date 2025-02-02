import { Component } from 'react';
import TopControls from './components/TopControls';
import Results from './components/Results';
import { searchPokemon } from './services/pokemonService';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/tailwind.css';
import { AppState } from './interfaces/AppState';

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      errorMessage: null,
      errorTriggered: false,
    };
  }

  handleThrowError = () => {
    this.setState({ errorTriggered: true });
  };

  handleSearch = async (query: string) => {
    this.setState({ loading: true, errorMessage: null });

    try {
      if (!query.trim()) {
        const allPokemons = await searchPokemon('');
        this.setState({
          results: allPokemons.map((pokemon) => ({
            name: pokemon.name,
            description: `Height: ${pokemon.height}, Weight: ${pokemon.weight}`,
          })),
        });
      } else {
        const data = await searchPokemon(query);
        if (data.length > 0) {
          this.setState({
            results: data.map((pokemon) => ({
              name: pokemon.name,
              description: `Height: ${pokemon.height}, Weight: ${pokemon.weight}`,
            })),
          });
        } else {
          this.setState({
            results: [],
            errorMessage: 'No Pokémon found. Try another name.',
          });
        }
      }
    } catch (error) {
      console.error(error);
      this.setState({ errorMessage: 'Failed to fetch data. Try again later.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.errorTriggered) {
      throw new Error('This is a test error!');
    }

    return (
      <ErrorBoundary>
        <div className="app-container p-6">
          <TopControls onSearch={this.handleSearch} />

          {this.state.loading && (
            <p className="text-blue-500 mt-4">Loading...</p>
          )}
          {this.state.errorMessage && (
            <p className="text-red-500 mt-4">{this.state.errorMessage}</p>
          )}
          <Results results={this.state.results} />
          <button
            className="bg-red-500 text-white p-2 rounded mt-4"
            onClick={this.handleThrowError}
          >
            Error Button
          </button>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
