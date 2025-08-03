const geminiService = require('../services/geminiService');
const newsApiService = require('../services/newsApiService');
const { fetchArticleContent } = require('../utils/articleScraper');

// Constants for truncation and minimum content length
const MIN_SCRAPED_CONTENT_LENGTH = 100;
const MAX_SCRAPED_TEXT_LENGTH = 8000;

exports.analyzeNews = async (req, res) => {
  const { newsInput, inputType } = req.body;

  if (!newsInput) {
    return res.status(400).json({ error: 'News input is required.' });
  }

  let articleText = newsInput;
  if (inputType === 'url') {
    articleText = await fetchArticleContent(newsInput);
    if (!articleText || articleText.length < MIN_SCRAPED_CONTENT_LENGTH) {
      return res.status(500).json({ error: 'Failed to fetch or scrape sufficient article content from the provided URL. Please try pasting the text directly.' });
    }
    // Truncate if article content is too long for Gemini
    if (articleText.length > MAX_SCRAPED_TEXT_LENGTH) {
      articleText = articleText.substring(0, MAX_SCRAPED_TEXT_LENGTH) + '... (truncated)';
    }
  }

  try {
    // --- Gemini Call 1: Summarize & Extract Entities ---
    const originalAnalysis = await geminiService.analyzeOriginalNews(articleText);

    if (!originalAnalysis || !originalAnalysis.summary) {
      return res.status(500).json({ error: "AI failed to analyze the original news clearly. Please try again or with different text." });
    }

    const { companies, industries, themes } = originalAnalysis;

    // --- Gemini Call 2: Generate Search Queries for Divergent Views ---
    const combinedKeywords = [...companies, ...industries, ...themes].filter(Boolean).slice(0, 5);
    let searchQueries = [];
    if (combinedKeywords.length > 0) {
      searchQueries = await geminiService.generateSearchQueries(combinedKeywords);
    }

    // --- News Search (NewsData.io Integration) ---
    const divergentArticles = [];
    for (const query of searchQueries) {
      const articles = await newsApiService.searchNews(query, 1); // Get 1 article per query
      if (articles.length > 0) {
        divergentArticles.push(articles[0]); // Add the best match
      }
    }

    const divergentPerspectives = [];
    for (const article of divergentArticles) {
      // --- Gemini Call 3: Analyze Divergence ---
      const divergenceSummary = await geminiService.analyzeDivergence(
        originalAnalysis.summary,
        [...originalAnalysis.companies, ...originalAnalysis.themes],
        article.title,
        article.content_snippet
      );
      divergentPerspectives.push({
        title: article.title,
        url: article.url,
        summary: divergenceSummary
      });
    }

    res.json({
      originalAnalysis: originalAnalysis,
      divergentPerspectives: divergentPerspectives
    });

  } catch (error) {
    console.error('Error in newsController.analyzeNews:', error);
    res.status(500).json({ error: 'An unexpected error occurred during news analysis. Please check server logs.' });
  }
};