const apiKey = 'Nnkm8qiRhC7bHsMIENGi1gUk9v2UwQT3'; // Replace 'YOUR_API_KEY' with your actual API key
// const apiKey = '3zezOvZGq1DAX9EoRH4RGqOz3XW9Gf4Q'
const filterForm = document.getElementById('filterForm');

filterForm.addEventListener('change', function(event) {
  // const filterType = event.target.value;
  const timeFrame = document.querySelector('input[name="timeFrame"]:checked').value;
  const sortBy = document.querySelector('input[name="sortBy"]:checked').value;

  console.log(timeFrame);
  console.log(sortBy);

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
  // if (filterType === 'emailed') {
  //   apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=' + apiKey;
  // } 
  // else if (filterType === 'shared') {
  //   apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=' + apiKey;
  // } 
  // else if (filterType === 'viewed') {
  //   apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=' + apiKey;
  // }

  fetchArticles(apiUrl);
});

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
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news');

        const articleContent = document.createElement('div');
        articleContent.classList.add('article');
        articleContent.textContent = `${counter}) ${article.title}`;
        ++counter;
        // articleContent.textContent = article.title; 
        articleContent.style.fontWeight = 'bold';

        const articleDescription = document.createElement('div');
        articleDescription.classList.add('article-description');
        articleDescription.style.display = 'flex';

        // TODO: Attempt at getting the image for the article
        const articleImg = document.createElement('img');
        articleImg.classList.add('article-img');

        if (article.media && article.media[0] && article.media[0]['media-metadata'] && article.media[0]['media-metadata'][0] && article.media[0]['media-metadata'][0].url) {
          articleImg.src = article.media[0]['media-metadata'][0].url;
        }

        articleImg.style.borderRadius = '10px';
        // articleImg.style.width = '150px';

        const firstSent = article.abstract.split('.')[0];
        const articleFirstSent = document.createElement('div');
        articleFirstSent.classList.add('article-sentence');
        articleFirstSent.textContent = firstSent;
        articleFirstSent.style.fontWeight = 'normal'

        articleDescription.appendChild(articleImg);
        articleDescription.appendChild(articleFirstSent);
        articleContent.appendChild(articleDescription);
        articleDiv.appendChild(articleContent);
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
