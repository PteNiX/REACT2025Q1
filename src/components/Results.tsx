import { Component } from 'react';
import { ResultsProps } from '../interfaces/ResultsPropsState';

class Results extends Component<ResultsProps> {
  render() {
    const { results } = this.props;

    if (results.length === 0) {
      return null;
    }

    return (
      <div className="results-container mt-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-400 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Results;
