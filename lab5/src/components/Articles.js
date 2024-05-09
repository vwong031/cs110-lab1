import React, { useState } from 'react';
import './Articles.css'

const Articles = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);  // Tracks the page it is at
  const [articlesPerPage] = useState(6);  // Determine how many articles can be displayed in a page
  const maxArticles = 15;
  const maxPages = Math.ceil(maxArticles / articlesPerPage);

  // const handleArticlesPerPageChange = (e) => {
  //   setArticlesPerPage(parseInt(e.target.value));
  //   setCurrentPage(1);
  // };

  const pageLastArticle = currentPage * articlesPerPage;
  const pageFirstArticle = pageLastArticle - articlesPerPage;
  const currentArticles = articles.slice(pageFirstArticle, pageLastArticle);

  const oddArticles = currentArticles.filter((_, index) => index % 2 === 0);
  const evenArticles = currentArticles.filter((_, index) => index % 2 !== 0);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!articles) {
    return <div>No articles yet</div>; 
  }

  return (
    <div className="news-container">
      <div className="columns">
        <div className="column">
          {oddArticles.map((article, index) => (
           <div className="news" key={index}>
            <div class="title">
              <h3 class="titleDiv">
                {`${pageFirstArticle + index * 2 + 1}) ${article.title}`}
              </h3>
              <div className="publication-date">
                {article.published_date}
              </div>
            </div>
            <div class="articleContent">
              <div className="article-description">
                {/* Add conditional rendering for nested properties */}
                {article.media && article.media[0] && article.media[0]['media-metadata'] && article.media[0]['media-metadata'][0] && (
                  <img class="article-img" src={article.media[0]['media-metadata'][0].url} alt={article.title} />
                )}
                <div className="article-sentence">{article.abstract.match(/.*?\./)[0]}</div>
              </div>
            </div>
          </div>
          ))}
        </div>

        <div className="column">
          {evenArticles.map((article, index) => (
           <div className="news" key={index}>
            <div class="title">
              <h3 class="titleDiv">
                {`${pageFirstArticle + index * 2 + 2}) ${article.title}`}
              </h3>
              <div className="publication-date">
                {article.published_date}
              </div>
            </div>
            <div class="articleContent">
              <div className="article-description">
                {/* Add conditional rendering for nested properties */}
                {article.media && article.media[0] && article.media[0]['media-metadata'] && article.media[0]['media-metadata'][0] && (
                  <img class="article-img" src={article.media[0]['media-metadata'][0].url} alt={article.title} />
                )}
                <div className="article-sentence">{article.abstract.match(/.*?\./)[0]}</div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        {[...Array(Math.min(maxPages, 3)).keys()].map((number) => (
          <button className="page-button" key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Articles;
