import React from 'react';
import './Articles.css'

const Articles = ({ articles }) => {
  if (!articles) {
    return <div>No articles yet</div>; 
  }

  return (
    <div className="news-container">
      {articles.map((article, index) => (
        <div className="news" key={index}>
          <h3>{`${index + 1}) ${article.title}`}</h3>
          <div className="publication-date">{article.published_date}</div>
          <div className="article-description">
            {/* Add conditional rendering for nested properties */}
            {article.media && article.media[0] && article.media[0]['media-metadata'] && article.media[0]['media-metadata'][0] && (
              <img src={article.media[0]['media-metadata'][0].url} alt={article.title} />
            )}
            <div className="article-sentence">{article.abstract.split('.')[0]}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Articles;
