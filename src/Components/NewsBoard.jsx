import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  console.error("API key is not defined. Make sure it is set in your .env file.");
}

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.articles) {
          setArticles(data.articles);
        } else {
          setError("No articles found");
        }
      } catch (err) {
        console.error("Error fetching news:", err.message);
        setError(err.message);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : articles.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      )}
    </div>
  );
};

export default NewsBoard;
