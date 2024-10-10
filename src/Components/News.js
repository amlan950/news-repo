import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import NewsItem from './NewsItem';

export default function News() {
  const [articles, setArticles] = useState([]);  // Articles state
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [searchTerm, setSearchTerm] = useState('');  // Search term state
  const [page, setPage] = useState(1);  // Current page
  const [totalResults, setTotalResults] = useState(0);  // Total results from API

  // Function to fetch articles from the API using the search term or default headlines
  const fetchArticles = async (term = '', currentPage = 1) => {
    setLoading(true);
    setError(null); // Reset error before fetching

    // Update searchTerm state
    setSearchTerm(term);

    // Default URL for top headlines (US)
    let url = `https://newsapi.org/v2/top-headlines?country=us&page=${currentPage}&pageSize=6&apiKey=99520987382c4b6e82a1cafa4ae3859b`;

    // If there is a search term, modify the URL to search for specific articles
    if (term.trim()) {
      url = `https://newsapi.org/v2/everything?q=${term}&page=${currentPage}&pageSize=6&apiKey=99520987382c4b6e82a1cafa4ae3859b`;
    }

    try {
      const data = await fetch(url);
      const parsedData = await data.json();

      if (parsedData.status === "ok") {
        setArticles(parsedData.articles);  // Update articles state
        setTotalResults(parsedData.totalResults);  // Update total results state
      } else {
        setError(parsedData.message || 'Error fetching articles');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch default news headlines on component mount
  useEffect(() => {
    fetchArticles('', page);  // Fetch default top headlines when the page loads
  }, [page]);

  // Handle the next page
  const handleNextPage = () => {
    if (page < Math.ceil(totalResults / 6)) {
      setPage(page + 1);
    }
  };

  // Handle the previous page
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      {/* Navbar for search */}
      <Navbar onSearch={(term) => fetchArticles(term, 1)} />

      <div className="container my-3">
        {/* Display search term or default title */}
        <h1>{searchTerm ? `Search Results for: ${searchTerm}` : 'Top News Headlines'}</h1>

        {/* Loading spinner or message */}
        {loading && <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>}

        {/* Error message */}
        {error && <p>{error}</p>}

        {/* Display articles */}
        <div className="row">
          {!loading && articles.map((article, index) => (
            <div className="col-md-4" key={index}>
              <NewsItem
                title={article.title ? article.title.slice(0, 45) : ""}
                description={article.description ? article.description.slice(0, 88) : ""}
                imgUrl={article.urlToImage}
                newsUrl={article.url}
              />
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="d-flex justify-content-between my-4">
          <button disabled={page <= 1} className="btn btn-primary" onClick={handlePreviousPage}>
            &larr; Previous
          </button>
          <button disabled={page >= Math.ceil(totalResults / 6)} className="btn btn-primary" onClick={handleNextPage}>
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
