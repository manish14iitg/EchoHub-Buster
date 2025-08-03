# EchoHub Buster Backend

## Breaking the Financial News Echo Chamber

### Problem Statement

In today's fast-paced financial world, individuals and investors are constantly bombarded with news, often leading to an **"echo chamber effect"**. This occurs when news sources and algorithms tend to reinforce existing beliefs, presenting a singular narrative and making it challenging to identify alternative viewpoints, potential risks, or opportunities. This lack of diverse perspectives can lead to biased decision-making and missed insights in financial markets.

### Solution

The EchoHub Buster Backend aims to combat this echo chamber effect by providing a powerful tool for analyzing financial news and actively seeking out **divergent perspectives**. It achieves this by:

1.  **Core Article Analysis:** Taking a user-provided news article (either via URL or raw text), it first summarizes the content and extracts key financial entities like companies, industries, and economic themes using advanced AI.
2.  **Intelligent Divergent Search:** Based on the initial analysis, the system intelligently crafts search queries designed to find news articles that offer contrasting or alternative viewpoints from a real-time news API.
3.  **AI-Powered Divergence Highlight:** For each found alternative article, the AI then specifically highlights how its perspective differs from the original article, providing users with a concise understanding of the nuances and counter-arguments.

This empowers users to gain a more holistic and unbiased understanding of financial events, fostering better-informed decision-making.

## Tech Stack

The EchoHub Buster Backend is built with a robust and modern JavaScript ecosystem:

* **Node.js**: The runtime environment for the backend.
* **Express.js**: A fast, unopinionated, minimalist web framework for building the API.
* **Google Gemini API (`@google/generative-ai`)**: Powers the core AI capabilities for summarization, entity extraction, query generation, and divergence analysis.
* **Axios**: A promise-based HTTP client for making API requests (e.g., to NewsData.io and for web scraping).
* **Cheerio**: A fast, flexible, and lean implementation of core jQuery specifically designed for server-side HTML parsing and web scraping.
* **CORS**: Middleware to enable Cross-Origin Resource Sharing, allowing front-end applications to interact with the backend.
* **Dotenv**: Loads environment variables from a `.env` file, keeping sensitive API keys secure.
* **NewsData.io API**: An external news API used to fetch real-time news articles based on generated search queries.

## Features

* **Article Summarization**: Get a concise summary of any financial news article.
* **Key Entity Extraction**: Automatically identify relevant companies, industries, and financial themes.
* **Divergent Perspective Discovery**: Intelligently searches for and presents news articles offering contrasting viewpoints.
* **AI-Powered Divergence Analysis**: Clearly highlights the differences between the original article and the discovered alternative perspectives.
* **URL & Text Input**: Analyze news either by providing a direct article URL (with content scraping) or by pasting the raw text.
* **Robust Error Handling**: Includes mechanisms to handle scraping failures, API errors, and AI processing issues.

## Installation and Setup

Follow these steps to get the EchoHub Buster Backend up and running on your local machine.

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js)
* A Google Cloud Project with the Gemini API enabled and an API Key.
* A NewsData.io API Key.

### Steps

1.  **Clone the Repository (or create the project structure):**

    If you're starting from scratch, create the following directory structure:

    ```
    echohub-buster-backend/
    ├── .env
    ├── package.json
    ├── server.js
    ├── routes/
    │   └── newsRoutes.js
    ├── controllers/
    │   └── newsController.js
    ├── services/
    │   └── geminiService.js
    │   └── newsApiService.js
    ├── utils/
    │   └── articleScraper.js
    ```

    Then, create each file as described in the previous response and paste the corresponding code.

2.  **Install Dependencies:**

    Navigate to the root directory of your project in your terminal and install the required Node.js packages:

    ```bash
    cd echohub-buster-backend
    npm install
    ```

3.  **Configure Environment Variables:**

    Create a file named `.env` in the root directory of your project (if it doesn't already exist) and add your API keys:

    ```dotenv
    PORT=5000
    GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY_HERE
    NEWSDATA_API_KEY=YOUR_NEWSDATA_IO_API_KEY_HERE
    ```
    **Important:** Replace `YOUR_GOOGLE_GEMINI_API_KEY_HERE` and `YOUR_NEWSDATA_IO_API_KEY_HERE` with your actual API keys. Do not commit your `.env` file to version control (e.g., Git).

4.  **Start the Server:**

    You can start the server using npm:

    ```bash
    npm start
    ```

    For development, if you have `nodemon` installed (as listed in `devDependencies`), you can use:

    ```bash
    npm run dev
    ```

    The server will typically run on `http://localhost:5000` (or the `PORT` you specified in your `.env` file). You should see a message in your console: `Server listening at http://localhost:5000`.

## API Endpoints

The backend exposes a single primary endpoint for news analysis:

### `POST /api/analyze-news`

Analyzes a financial news article and provides its summary, key entities, and divergent perspectives from other news sources.

* **URL:** `http://localhost:5000/api/analyze-news`
* **Method:** `POST`
* **Content-Type:** `application/json`

* **Request Body:**

    ```json
    {
        "newsInput": "[https://example.com/some-financial-article](https://example.com/some-financial-article)" , // Or "This is the full text of an article about...",
        "inputType": "url" // Or "text"
    }
    ```

    * `newsInput` (string, **required**): The URL of the article to analyze, or the raw text content of the article.
    * `inputType` (string, **required**): Specifies whether `newsInput` is a `"url"` or `"text"`.

* **Success Response (Status: 200 OK):**

    ```json
    {
        "originalAnalysis": {
            "summary": "Concise summary of the original article.",
            "companies": ["Company A", "Company B"],
            "industries": ["Industry X"],
            "themes": ["Economic Growth", "Interest Rates"]
        },
        "divergentPerspectives": [
            {
                "title": "Title of Divergent Article 1",
                "url": "[https://example.com/divergent-article-1](https://example.com/divergent-article-1)",
                "summary": "AI-generated summary highlighting how this article's perspective differs from the original."
            },
            {
                "title": "Title of Divergent Article 2",
                "url": "[https://example.com/divergent-article-2](https://example.com/divergent-article-2)",
                "summary": "AI-generated summary highlighting how this article's perspective differs from the original."
            }
        ]
    }
    ```

* **Error Responses:**

    * **Status: 400 Bad Request**
        ```json
        {
            "error": "News input is required."
        }
        ```
    * **Status: 500 Internal Server Error**
        ```json
        {
            "error": "Failed to fetch or scrape sufficient article content from the provided URL. Please try pasting the text directly."
        }
        ```
        or
        ```json
        {
            "error": "AI failed to analyze the original news clearly. Please try again or with different text."
        }
        ```
        or
        ```json
        {
            "error": "An unexpected error occurred during news analysis. Please check server logs."
        }
        ```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.
