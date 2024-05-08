import React, {useState} from 'react';
import fetchArticles from './Articles.js';
import './Sidebar.css'

const Sidebar = ({ fetchArticlesOnChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div class="sidebar">
      <form id="filterForm">
        <div class="input-and-button">
          <input class="input" type="text" placeholder="Enter a value 1-15" value={searchTerm} onChange={handleInputChange} />
          <button class="button">
            Search
          </button>
        </div>
        <p class="filterTitle">
          Sort By:
        </p>
        <div class="options-group">
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

        <p class="filterTitle">
          Time Frame:
        </p>
        <div class="options-group">
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
