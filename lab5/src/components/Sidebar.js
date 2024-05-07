import React from 'react';
import fetchArticles from './Articles.js';

const Sidebar = ({ fetchArticlesOnChange }) => {
  return (
    <div>
      <form id="filterForm">
        <div>
          <input type="radio" name="timeFrame" value="day" onChange={fetchArticlesOnChange} /> Day
          <input type="radio" name="timeFrame" value="week" onChange={fetchArticlesOnChange} /> Week
          <input type="radio" name="timeFrame" value="month" onChange={fetchArticlesOnChange} /> Month
        </div>
        <br />
        <div>
          <input type="radio" name="sortBy" value="viewed" onChange={fetchArticlesOnChange} /> Viewed
          <input type="radio" name="sortBy" value="shared" onChange={fetchArticlesOnChange} /> Shared
          <input type="radio" name="sortBy" value="emailed" onChange={fetchArticlesOnChange} /> Emailed
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
