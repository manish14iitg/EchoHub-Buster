const axios = require('axios');
const cheerio = require('cheerio');

async function fetchArticleContent(url) {
  try {
    const { data } = await axios.get(url, { timeout: 10000 }); // Add timeout
    const $ = cheerio.load(data);

    let articleText = '';
    const selectors = [
      'article p',
      'div.article-body p',
      'div.content p',
      '.story-body p',
      'main p',
      'p'
    ];

    for (const selector of selectors) {
      $(selector).each((i, el) => {
        const text = $(el).text().trim();
        if (text.length > 50) { // Only add substantial paragraphs
          articleText += text + '\n';
        }
      });
      if (articleText.length > 500) break; // Stop if we've found enough content
    }

    articleText = articleText.replace(/\s+/g, ' ').trim();

    if (articleText.length < 100) { // If very little text was scraped
      console.warn(`Scraped very little content from ${url}. Might be an issue.`);
      // Fallback to title/description if content is too short
      const title = $('title').text();
      const description = $('meta[name="description"]').attr('content');
      if (title) articleText = title + (description ? '. ' + description : '') + '\n' + articleText;
    }

    return articleText;

  } catch (error) {
    console.error(`Error fetching or scraping article from ${url}:`, error.message);
    // Attempt to return title/description even on error, if available
    try {
      const { data } = await axios.get(url, { timeout: 5000 }); // Shorter timeout for metadata
      const $ = cheerio.load(data);
      const title = $('title').text();
      const description = $('meta[name="description"]').attr('content');
      if (title || description) {
        return `(Failed to scrape full content) Title: ${title || 'N/A'}. Description: ${description || 'N/A'}.`;
      }
    } catch (metaError) {
      // Ignore metaError, just return null if everything fails
    }
    return null;
  }
}

module.exports = {
  fetchArticleContent,
};