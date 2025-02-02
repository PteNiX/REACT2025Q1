import { Component } from 'react';
import { TopControlsState } from '../interfaces/TopControlsState';
import { TopControlsProps } from '../interfaces/TopControlsPropsState';

class TopControls extends Component<TopControlsProps, TopControlsState> {
  constructor(props: TopControlsProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  handleSearch = () => {
    const { searchTerm } = this.state;
    this.props.onSearch(searchTerm);
    localStorage.setItem('searchTerm', searchTerm);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-2xl shadow-md  top-0 left-0 z-10">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className="w-2/3 p-2 border border-gray-300 rounded-lg bg-blue-500 text-white"
        />
        <button
          onClick={this.handleSearch}
          className={`ml-4 px-4 py-2 rounded-lg ${
            searchTerm.trim()
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-500'
          }`}
        >
          Search
        </button>
      </div>
    );
  }
}

export default TopControls;
