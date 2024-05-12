import React, { useState } from 'react';
import './Sidebar.css';

const apiKey = 'Nnkm8qiRhC7bHsMIENGi1gUk9v2UwQT3';

const Sidebar = ({ fetchArticlesOnChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const value = parseInt(searchTerm);

    if (!searchTerm) {
      alert("Please enter value");
      return;
    }

    if (value < 1 || value > 15 ) {
      alert("Please enter a value between 1 and 15");
      return;
    } 

    fetchArticlesOnChange(value);
  };


  const renderSearchResult = () => {
    if (searchResult) {
      return (
        <div>
          {searchResult.map((article, index) => (
            <div key={index}>
              <h3>{article.headline.main}</h3>
              <p>{article.snippet}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="sidebar">
      <form id="filterForm">
        <div className="input-and-button">
          <input className="input" type="text" placeholder="Enter a value 1-15" value={searchTerm} onChange={handleInputChange} />
          <button className="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <p className="filterTitle">
          Sort By:
        </p>
        <div className="options-group">
          <div className="option">
            <input type="radio" name="sortBy" value="viewed" onChange={() => fetchArticlesOnChange('viewed', (document.querySelector('input[name="timeFrame"]:checked') || {}).value)} />
            <label htmlFor="viewed">Most Viewed</label>
          </div>
          <div className="option">
            <input type="radio" name="sortBy" value="shared" onChange={() => fetchArticlesOnChange('shared', (document.querySelector('input[name="timeFrame"]:checked') || {}).value)} />
            <label htmlFor="shared">Most Shared</label>
          </div>
          <div className="option">
            <input type="radio" name="sortBy" value="emailed" onChange={() => fetchArticlesOnChange('emailed', (document.querySelector('input[name="timeFrame"]:checked') || {}).value)} />
            <label htmlFor="emailed">Most Emailed</label>
          </div>
        </div>

        <br />

        <p className="filterTitle">
          Time Frame:
        </p>
        <div className="options-group">
          <div className="option">
            <input type="radio" name="timeFrame" value="day" onChange={() => fetchArticlesOnChange((document.querySelector('input[name="sortBy"]:checked') || {}).value, 'day')} />
            <label htmlFor="day">Day</label>
          </div>
          <div className="option">
            <input type="radio" name="timeFrame" value="week" onChange={() => fetchArticlesOnChange((document.querySelector('input[name="sortBy"]:checked') || {}).value, 'week')} />
            <label htmlFor="week">Week</label>
          </div>
          <div className="option">
            <input type="radio" name="timeFrame" value="month" onChange={() => fetchArticlesOnChange((document.querySelector('input[name="sortBy"]:checked') || {}).value, 'month')} />
            <label htmlFor="month">Month</label>
          </div>
        </div>
      </form>
      {renderSearchResult()}
    </div>
  );
};

export default Sidebar;
