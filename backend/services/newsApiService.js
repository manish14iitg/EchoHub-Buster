const axios = require('axios');

const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

async function searchNews(query, maxArticles = 3) {
  if (!NEWSDATA_API_KEY) {
    console.warn("NEWSDATA_API_KEY is not set. Skipping real news search.");
    return [];
  }

  try {
    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: NEWSDATA_API_KEY,
        q: query,
        language: 'en',
        category: 'business, top', // Focus on relevant categories
        size: maxArticles
      },
      timeout: 10000 // Timeout for the news API call
    });

    if (response.data && response.data.results) {
      return response.data.results.map(article => ({
        title: article.title,
        url: article.link,
        content_snippet: article.description || article.content // Use description or content
      }));
    }
    return [];
  } catch (error) {
    console.error(`Error searching NewsData.io for query "${query}":`, error.message);
    if (error.response) {
      console.error('NewsData.io error response:', error.response.data);
    }
    return [];
  }
}

module.exports = {
  searchNews,
};