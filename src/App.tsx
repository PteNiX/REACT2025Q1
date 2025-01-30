import { useState } from 'react';
import TopControls from './components/TopControls';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="app-container p-6">
      <TopControls onSearch={handleSearch} />
    </div>
  );
}

export default App;
