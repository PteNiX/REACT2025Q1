import { useState } from 'react';
interface TopControlsProps {
  onSearch: (query: string) => void;
}
const TopControls: React.FC<TopControlsProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-2xl shadow-md fixed top-0 left-0 w-full z-10">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-2/3 p-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleSearch}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default TopControls;
