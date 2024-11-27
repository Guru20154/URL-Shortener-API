# URL Shortener API

A simple URL shortener API that allows users to shorten URLs and access the original URL using a unique short ID. The API also provides usage statistics for each shortened URL.

## Features

- **Shorten URLs**: Accepts a URL and returns a shortened version.
- **Redirect to Original URL**: Redirects to the original URL when accessed using the shortened URL.
- **Usage Statistics**: Retrieves the number of clicks and last accessed time for a shortened URL.
- **Rate Limiting**: Limits the number of requests per minute (100 requests per IP).

## API Endpoints

### `POST /shorten`
Shorten a URL.

**Request:**
- **Method**: `POST`
- **URL**: `/shorten`
- **Body**: 
    ```json
    {
      "url": "https://example.com"
    }
    ```
- **Response**:
    - **200 OK** (URL successfully shortened)
        ```json
        {
            "shortUrl": "http://localhost:3000/abc12345"
        }
        ```
    - **400 Bad Request** (Missing or invalid URL)
        ```json
        {
            "error": "Invalid URL format"
        }
        ```
### `GET /:shortId`
Redirect to the original URL associated with the shortId.

**Request:**

- **Method**: `GET`
- **URL**: `/abc12345`
- **Response**:
    - Redirects to the original URL (e.g., https://example.com).

### `GET /stats/:shortId`
Get usage statistics for a shortened URL.

**Request:**

- **Method**: `GET`
- **URL**: `/stats/abc12345`
- **Response**:
    - **200 OK**
        ```json
        {
            "originalUrl": "https://example.com",
            "totalClicks": 5,
            "lastAccessed": "2024-11-27T10:15:30.000Z"
        }
        ```
    - **404 Not Found (If the `shortId` does not exist)**

## Rate Limiting
The API uses rate limiting to restrict the number of requests from a single IP address to 100 requests per minute. If a user exceeds this limit, they will receive the following error response:

**Response:**
```json
{
    "message": "Too many requests from this IP, please try again later."
}
```

## Installation
### Prerequisites
- Node.js (>= 14.x)
- MongoDB (local or cloud instance)
### Steps to Run Locally
- Clone the repository
- Install dependencies:
```bash
    npm install
```
- Create a .env file in the root directory and configure your MongoDB URI
- Start the server:
```bash
    npm start
```


## Dependencies
- `express`: Web framework for Node.js
- `mongoose`: MongoDB ORM for Node.js
- `nanoid`: A tiny, secure URL-friendly unique string ID generator
- `express-rate-limit`: Rate limiting middleware for Express