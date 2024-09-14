import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError(error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <input 
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }} className="flags-container">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className="flag-item" style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', width: '200px', height:"180px" }}>
            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="flag-img" style={{ width: '100%' }} />
            <h3 className="country-name">{country.name.common}</h3>
          </div>
        ))}
      </div>
      {filteredCountries.length === 0 && <p>No countries found</p>}
      {error && <p>Error fetching countries</p>}
    </div>
  );
};

export default App;