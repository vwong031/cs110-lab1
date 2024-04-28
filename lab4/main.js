const apiKey = 'Nnkm8qiRhC7bHsMIENGi1gUk9v2UwQT3'; // Replace 'YOUR_API_KEY' with your actual API key

const filterForm = document.getElementById('filterForm');

filterForm.addEventListener('change', function(event) {
  const filterType = event.target.value;

  let apiUrl;
  if (filterType === 'emailed') {
    apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=' + apiKey;
  } 
  else if (filterType === 'shared') {
    apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=' + apiKey;
  } 
  else if (filterType === 'viewed') {
    apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=' + apiKey;
  }
  
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

      
      articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news');

        const articleContent = document.createElement('div');
        articleContent.classList.add('article');
        articleContent.textContent = article.title; 

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
