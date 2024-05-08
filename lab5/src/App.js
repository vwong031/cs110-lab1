import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Articles from './components/Articles';
import Title from './components/Title';
import './App.css'

const apiKey = 'Nnkm8qiRhC7bHsMIENGi1gUk9v2UwQT3';

function App() {
  const [title, setTitle] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticlesOnChange();
  }, []);

  const fetchArticlesOnChange = () => {
    const timeFrameInput = document.querySelector('input[name="timeFrame"]:checked');
    const sortByInput = document.querySelector('input[name="sortBy"]:checked');

    if (!timeFrameInput || !sortByInput) {
      return; // Return early if inputs are not found
    }

    const timeFrame = timeFrameInput.value;
    const sortBy = sortByInput.value;

    let apiUrl;

    // Construct API URL based on selected time frame and sort option
    if (timeFrame === 'day') {
      if (sortBy === 'viewed') {
        apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=' + apiKey;
      } else if (sortBy === 'shared') {
        apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=' + apiKey;
      } else if (sortBy === 'emailed') {
        apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=' + apiKey;
      }
    } else if (timeFrame === 'week') {
      if (sortBy === 'viewed') {
        apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=' + apiKey;
      } else if (sortBy === 'shared') {
        apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/shared/7/facebook.json?api-key=' + apiKey;
      } else if (sortBy === 'emailed') {
        apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=' + apiKey;
      }
    } else if (timeFrame === 'month') {
      if (sortBy === 'viewed') {
        apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=' + apiKey;
      } else if (sortBy === 'shared') {
        apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/shared/30/facebook.json?api-key=' + apiKey;
      } else if (sortBy === 'emailed') {
        apiUrl = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/30.json?api-key=' + apiKey;
      }
    }

    // Fetch articles based on API URL
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setArticles(data.results);
        // TODO: Change title based on sort
        setTitle(`Most ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} - ${timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}`);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  };

  return (
    <div className="App">
      <Title title={title} />
      <div class="content">
        <Sidebar fetchArticlesOnChange={fetchArticlesOnChange} />
        <Articles articles={articles} />
      </div>
    </div>
  );
}

export default App;
