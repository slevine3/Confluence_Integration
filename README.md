# Confluence Integration Server

A Node.js + TypeScript server that integrates with Confluence using GraphQL and OAuth2 authentication.

## Features

- OAuth2 authentication with client credentials flow
- GraphQL API integration with Confluence
- Express.js server with TypeScript
- Unit testing with Mocha and Chai
- API endpoints for fetching pages and spaces

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Confluence Cloud instance with API access
- OAuth2 credentials (client ID and secret)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd confluence-integration
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Confluence credentials:
```env
PORT=3000
NODE_ENV=development
CONFLUENCE_DOMAIN=https://your-domain.atlassian.net
CONFLUENCE_CLIENT_ID=your-client-id
CONFLUENCE_CLIENT_SECRET=your-client-secret
```

5. Build the project:
```bash
npm run build
```

6. Start the server:
```bash
npm start
```

For development with hot-reload:
```bash
npm run dev
```

## API Endpoints

### Get Pages in a Space
```http
GET /api/pages?spaceKey=XYZ&limit=25&start=0
```

Query Parameters:
- `spaceKey` (required): The key of the Confluence space
- `limit` (optional): Number of pages to return (default: 25, max: 100)
- `start` (optional): Starting index for pagination (default: 0)

### Get Page by ID
```http
GET /api/pages/:pageId
```

Parameters:
- `pageId` (required): The ID of the Confluence page

## Testing

Run the test suite:
```bash
npm test
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Lint the code:
```bash
npm run lint
```

3. Format the code:
```bash
npm run format
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (invalid parameters)
- `401`: Unauthorized (invalid credentials)
- `404`: Not Found
- `500`: Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 