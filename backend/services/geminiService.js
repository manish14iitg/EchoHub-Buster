const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API (make sure to set GEMINI_API_KEY in your .env)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Or 'gemini-1.5-pro' for advanced capabilities

// Function to analyze the original news article
async function analyzeOriginalNews(articleText) {
  const prompt1 = `
    Analyze the following financial news article and extract key information.
    1. Provide a concise summary of the article (around 3-5 sentences).
    2. Identify the main companies (e.g., Apple Inc., Google), industries (e.g., Technology, Automotive), and financial themes (e.g., Inflation, Interest Rates, Q3 Earnings) discussed.
    If a company/industry/theme is not explicitly mentioned or clearly implied, omit it from the respective array.
    Format your response as a JSON object with 'summary' (string), 'companies' (array of strings), 'industries' (array of strings), and 'themes' (array of strings).
    Ensure the JSON is perfectly valid and ready for parsing.

    Article:
    "${articleText}"
  `;

  try {
    const result = await model.generateContent(prompt1);
    const response = await result.response;
    const jsonString = response.text().replace(/```json\n|\n```/g, '').trim();
    const parsedResult = JSON.parse(jsonString);

    // Ensure arrays are initialized if Gemini returned null/undefined for them
    parsedResult.companies = parsedResult.companies || [];
    parsedResult.industries = parsedResult.industries || [];
    parsedResult.themes = parsedResult.themes || [];

    return parsedResult;
  } catch (error) {
    console.error("Error in analyzeOriginalNews (Gemini Call 1):", error);
    if (error.response && error.response.text) {
        console.error("Gemini's raw response (1):", error.response.text());
    }
    throw new Error("Failed to analyze original news with AI.");
  }
}

// Function to generate search queries for divergent views
async function generateSearchQueries(combinedKeywords) {
  const searchPrompt = `
    Given the following key entities and themes from a financial news article:
    Keywords: ${combinedKeywords.join(', ')}

    Generate 3 short, distinct search queries (2-5 words each) for a news API to find articles with *contrasting* or *alternative perspectives*.
    Focus on different viewpoints (e.g., "bearish outlook [company]", "economic recession warning", "unexpected market impact", "alternative investment strategies").
    Output as a JSON array of strings: ["query1", "query2", "query3"].
    Ensure the JSON is perfectly valid.
  `;

  try {
    const result = await model.generateContent(searchPrompt);
    const response = await result.response;
    const jsonString = response.text().replace(/```json\n|\n```/g, '').trim();
    const searchQueries = JSON.parse(jsonString);

    if (!Array.isArray(searchQueries) || searchQueries.some(q => typeof q !== 'string')) {
      console.warn("Gemini's search query response was not an array of strings. Falling back to default.");
      return [`${combinedKeywords[0] || 'stock market'} outlook`, `${combinedKeywords[1] || 'economy'} debate`].filter(Boolean);
    }
    return searchQueries;
  } catch (error) {
    console.error("Error in generateSearchQueries (Gemini Call 2):", error);
    if (error.response && error.response.text) {
        console.error("Gemini's raw response (2):", error.response.text());
    }
    // Fallback to a default set of queries if parsing fails
    return [`${combinedKeywords[0] || 'stock market'} outlook`, `${combinedKeywords[1] || 'economy'} debate`].filter(Boolean);
  }
}

// Function to analyze divergence between articles
async function analyzeDivergence(originalSummary, originalKeywords, newArticleTitle, newArticleSnippet) {
  const divergencePrompt = `
    Analyze the following new article and compare its perspective to the provided original news analysis.
    Highlight the main differences, new insights, or contrasting arguments in 2-4 sentences.
    If the perspective is largely similar or adds no significant new information, state "Similar perspective."
    Focus on how this new article specifically challenges or provides a different angle from the original.

    Original Article Summary: "${originalSummary}"
    Original Article Companies/Themes: ${originalKeywords.join(', ')}.

    New Article Title: "${newArticleTitle}"
    New Article Content Snippet: "${newArticleSnippet}"
  `;

  try {
    const result = await model.generateContent(divergencePrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in analyzeDivergence (Gemini Call 3):", error);
    if (error.response && error.response.text) {
        console.error("Gemini's raw response (3):", error.response.text());
    }
    return "Failed to get a divergent perspective due to an AI error.";
  }
}

module.exports = {
  analyzeOriginalNews,
  generateSearchQueries,
  analyzeDivergence,
};