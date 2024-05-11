import React, { useState } from 'react';
import './Articles.css';

const Articles = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const maxArticles = 15;
  const maxPages = Math.ceil(maxArticles / articlesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderArticle = (article, index) => {
    const articleNumber = (currentPage - 1) * articlesPerPage + index + 1;

    try {
      return (
        <div className="news" key={index}>
          <div className="title">
            <h3 className="titleDiv">{`${articleNumber}) ${article.title}`}</h3>
            <div className="publication-date">{article.published_date}</div>
          </div>
          <div className="articleContent">
            <div className="article-description">
              {article.media && article.media[0] && article.media[0]['media-metadata'] && article.media[0]['media-metadata'][0] && (
                <img className="article-img" src={article.media[0]['media-metadata'][0].url} alt={article.title} />
              )}
              <div className="article-sentence">{article.abstract.match(/.*?\./)[0]}</div>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error('Error rendering article:', error);
      return (
        <div className="news" key={index}>
          <div className="title">
            <h3 className="titleDiv">Article not available</h3>
          </div>
          <div className="articleContent">
            <div className="article-description">
              <div className="article-sentence">Article information could not be retrieved.</div>
            </div>
          </div>
        </div>
      );
    }
  };

  const pageFirstArticle = (currentPage - 1) * articlesPerPage;
  const pageLastArticle = Math.min(currentPage * articlesPerPage, maxArticles);
  const currentArticles = articles.slice(pageFirstArticle, pageLastArticle);

  const leftColumnArticles = currentArticles.filter((_, index) => index % 2 === 0);
  const rightColumnArticles = currentArticles.filter((_, index) => index % 2 !== 0);

  return (
    <div className="news-container">
      <div className="columns">
        <div className="column">
          {leftColumnArticles.map((article, index) => renderArticle(article, index * 2))}
        </div>
        <div className="column">
          {rightColumnArticles.map((article, index) => renderArticle(article, index * 2 + 1))}
        </div>
      </div>

      {articles.length > 0 && (
        <div className="pagination">
          {[...Array(Math.min(maxPages, 3)).keys()].map((number) => (
            <button className="page-button" key={number + 1} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
