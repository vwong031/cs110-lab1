import React, {useState} from 'react';
// import fetchArticles from './Articles.js';
import './Sidebar.css'

const Sidebar = ({ fetchArticlesOnChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const value = parseInt(searchTerm)

    if (value > 15) {
      alert("Number is higher than 15");
    }

    // TODO: Search for the specified article
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
            <input type="radio" name="sortBy" value="viewed" onChange={fetchArticlesOnChange} />
            <label htmlFor="viewed">Most Viewed</label>
          </div>
          <div className="option">
            <input type="radio" name="sortBy" value="shared" onChange={fetchArticlesOnChange} />
            <label htmlFor="shared">Most Shared</label>
          </div>
          <div className="option">
            <input type="radio" name="sortBy" value="emailed" onChange={fetchArticlesOnChange} />
            <label htmlFor="emailed">Most Emailed</label>
          </div>
        </div>

        <br />

        <p className="filterTitle">
          Time Frame:
        </p>
        <div className="options-group">
          <div className="option">
            <input type="radio" name="timeFrame" value="day" onChange={fetchArticlesOnChange} />
            <label htmlFor="day">Day</label>
          </div>
          <div className="option">
            <input type="radio" name="timeFrame" value="week" onChange={fetchArticlesOnChange} />
            <label htmlFor="week">Week</label>
          </div>
          <div className="option">
            <input type="radio" name="timeFrame" value="month" onChange={fetchArticlesOnChange} />
            <label htmlFor="month">Month</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
