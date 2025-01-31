import { Component } from 'react';
import TopControls from './components/TopControls';
import Results from './components/Results';
import { fetchPokemon } from '../services/pokemonService';
import './App.css';

interface Result {
  name: string;
  description: string;
}

interface State {
  results: Result[];
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: [],
    };
  }

  handleSearch = async (query: string) => {
    if (!query) {
      this.setState({ results: [] });
      return;
    }

    const data = await fetchPokemon(query);
    if (data) {
      this.setState({
        results: [
          {
            name: data.name,
            description: `Height: ${data.height}, Weight: ${data.weight}`,
          },
        ],
      });
    } else {
      this.setState({
        results: [{ name: 'Not found', description: 'No data available' }],
      });
    }
  };

  render() {
    return (
      <div className="app-container p-6">
        <TopControls onSearch={this.handleSearch} />
        <Results results={this.state.results} />
      </div>
    );
  }
}

export default App;
