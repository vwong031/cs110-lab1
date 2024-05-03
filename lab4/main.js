const apiKey = 'Nnkm8qiRhC7bHsMIENGi1gUk9v2UwQT3'; // Replace 'YOUR_API_KEY' with your actual API key
const filterForm = document.getElementById('filterForm');

const timeFrameInputs = document.querySelectorAll('input[name="timeFrame"]');
const sortByInputs = document.querySelectorAll('input[name="sortBy"]');

timeFrameInputs.forEach(input => {
  input.addEventListener('change', fetchArticlesOnChange);
});

sortByInputs.forEach(input => {
  input.addEventListener('change', fetchArticlesOnChange);
});

//filterForm.addEventListener('change', fetchArticlesOnChange);

function fetchArticlesOnChange() {
  const timeFrame = document.querySelector('input[name="timeFrame"]:checked').value;
  const sortBy = document.querySelector('input[name="sortBy"]:checked').value;

  let apiUrl;

  if (timeFrame === 'day') {
    if (sortBy === 'viewed') {
      apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=' + apiKey;
    }
    else if (sortBy == 'shared') {
      apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=' + apiKey;
    }
    else if (sortBy === 'emailed') {
      apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=' + apiKey;
    }
  }
  else if (timeFrame === 'week') {
    if (sortBy === 'viewed') {
      apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=' + apiKey;
    }
    else if (sortBy == 'shared') {
      apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/shared/7/facebook.json?api-key=' + apiKey;
    }
    else if (sortBy === 'emailed') {
      apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=' + apiKey;
    }
  }
  else if (timeFrame === 'month') {
    if (sortBy === 'viewed') {
      apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=' + apiKey;
    }
    else if (sortBy == 'shared') {
      apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/shared/30/facebook.json?api-key=' + apiKey;
    }
    else if (sortBy === 'emailed') {
      apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/30.json?api-key=' + apiKey;
    }
  }

  fetchArticles(apiUrl);
}

fetchArticlesOnChange();

function fetchArticles(url, title) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const articles = data.results;

      const container = document.createElement('div');
      container.classList.add('category-container');

      const header = document.createElement('h2');
      header.textContent = title;
      container.appendChild(header);

      let counter = 1;

      articles.forEach(article => {

        if (!article.media || !article.media.length || !article.media[0]['media-metadata'] || !article.media[0]['media-metadata'].length || !article.media[0]['media-metadata'][0].url) {
          return; 
        }

        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news');
        articleDiv.style.marginBottom = '25px';
        articleDiv.style.height = 'auto';

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title-div');
        titleDiv.style.display = 'flex';
        titleDiv.style.marginLeft = '15px';

        const articleContent = document.createElement('h3');
        articleContent.classList.add('article');
        articleContent.textContent = `${counter}) ${article.title}`;
        ++counter;
        articleContent.style.fontWeight = 'bold';
        articleContent.style.marginTop = '25px';

        const publicationDate = document.createElement('div');
        publicationDate.classList.add('publication-date');
        const date = article.published_date;
        publicationDate.textContent = date;
        publicationDate.style.fontWeight = 'normal';
        publicationDate.style.fontSize = '12px';
        publicationDate.style.color = 'dimgray';
        publicationDate.style.marginTop = '25px';
        publicationDate.style.marginLeft = 'auto';
        publicationDate.style.whiteSpace = 'nowrap';
        publicationDate.style.marginRight = '10px';

        const articleDescription = document.createElement('div');
        articleDescription.classList.add('article-description');
        articleDescription.style.display = 'flex';
        articleDescription.style.marginBottom = '15px';
        articleDescription.style.marginTop = '15px';

        const articleImg = document.createElement('img');
        articleImg.classList.add('article-img');

        if (article.media && article.media[0] && article.media[0]['media-metadata'] && article.media[0]['media-metadata'][0] && article.media[0]['media-metadata'][0].url) {
          articleImg.src = article.media[0]['media-metadata'][0].url;
          articleImg.style.width = '150px';
          articleImg.style.height = '100px';
        }

        articleImg.style.borderRadius = '10px';
        articleImg.style.marginRight = '10px';

        const firstSent = article.abstract.split('.')[0];
        const articleFirstSent = document.createElement('div');
        articleFirstSent.classList.add('article-sentence');
        articleFirstSent.textContent = firstSent;
        articleFirstSent.style.fontWeight = 'normal';
        articleFirstSent.style.fontSize = '13px';

        articleDescription.appendChild(articleImg);
        articleDescription.appendChild(articleFirstSent);
        articleContent.appendChild(articleDescription);
        titleDiv.appendChild(articleContent);
        titleDiv.appendChild(publicationDate);
        articleDiv.appendChild(titleDiv);
        container.appendChild(articleDiv);
      });

      const newsContainer = document.querySelector('.news-container');
      newsContainer.innerHTML = '';

      newsContainer.appendChild(container);
  })
  .catch(error => {
    console.error('Error fetching articles:', error);
  });
}
