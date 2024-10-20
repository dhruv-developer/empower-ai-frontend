import React, { useState } from 'react';
import AnalysisForm from '../components/AnalysisForm';
import ResultsDisplay from '../components/ResultsDisplay';

const Analysis = () => {
  const [results, setResults] = useState(null);

  const handleResultsReceived = (analysisResults) => {
    setResults(analysisResults);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Economic Equality and Leadership Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Input Text for Analysis</h2>
          <AnalysisForm onResultsReceived={handleResultsReceived} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Analysis Results</h2>
          {results ? (
            <ResultsDisplay results={results} />
          ) : (
            <p className="text-gray-500">Enter text and submit for analysis to see results here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;