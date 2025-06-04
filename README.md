# House Numbers Challenge Backend

A Node.js backend service that processes and analyzes text snippets using AI providers.

## 🚀 Features

- Text snippet processing and analysis
- Authentication using JWT
- Integration with multiple AI providers (OpenAI and Google AI)
- MongoDB database integration
- Docker support
- Comprehensive error handling
- API documentation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **AI Providers**:
  - OpenAI
  - Google AI (Gemini)
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier, Husky
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js (version specified in .nvmrc)
- MongoDB
- Docker and Docker Compose (optional)
- OpenAI API Key
- Google AI API Key

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/house-numbers

# JWT Configuration
JWT_SECRET=your_jwt_secret

# AI Provider Keys
OPENAI_API_KEY=your_openai_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

## 🚀 Getting Started

### Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Using Docker

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

## 📚 API Endpoints

### Authentication

- `POST /api/v1/auth/login`
  - Request body: `{ "username": "admin" }`
  - Returns: JWT token

### Snippets

- `POST /v1/api/snippets`

  - Protected route (requires JWT)
  - Request body: `{ "text": "This is a long blog post draft about how to write clean code using TDD principles." }`
  - Returns: Created snippet with ID and analysis

- `GET /v1/api/snippets/:id`
  - Protected route (requires JWT)
  - Returns: Snippet details and analysis

### Health Check

- `GET /liveness-check`
  - Returns: Server status

### Postman Collection Setup

1. Open Postman
2. Click on "Import" button in the top left
3. Select "File" tab
4. Import both files from the `docs` folder:
   - `collection.json` - Contains all API endpoints
   - `environment.json` - Contains environment variables
5. After import, select the environment from the environment dropdown in the top right
6. Update the environment variables if needed:
   - `base_url`: Your API base URL (e.g., `http://localhost:3000`)
   - `token`: JWT token (will be automatically set after login)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Get a token from the login endpoint
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your_token>
   ```

## 🏗️ Architecture

The project follows a layered architecture pattern:

- **Routes**: Handle HTTP requests and responses
- **Controllers**: Process requests and delegate to services
- **Services**: Contain business logic
- **Models**: Define data structures and database schemas
- **Middlewares**: Handle cross-cutting concerns (auth, error handling)
- **Utils**: Shared utilities and helpers

## 🧪 Testing

Run tests using:

```bash
npm test
```

For test coverage:

```bash
npm run test:coverage
```

## 📝 Code Quality

- Linting: `npm run lint`
- Formatting: `npm run format`
- Type checking: `npm run type-check`

## 📄 TODO

- [ ] Add users logic and endpoints

- [ ] Add roles logic for auth and snippets handling

  - [ ] Role-based access control (RBAC)
  - [ ] Admin role for system management
  - [ ] User role for basic operations
  - [ ] Custom roles for specific use cases

- [ ] Add snippets full CRUD

  - [ ] Update snippet
  - [ ] Delete snippet
  - [ ] List snippets with pagination and filters

- [ ] Add more AI providers

  - [ ] Hugging Face

- [ ] AI agent creation logic

  - [ ] Agent configuration
  - [ ] Agent training
  - [ ] Agent deployment
  - [ ] Agent monitoring

- [ ] Improve tests

  - [ ] Unit tests for all components
  - [ ] Integration tests
  - [ ] E2E tests

- [ ] CI with GitHub Actions pipeline

- [ ] Improve error handling

  - [ ] Error mapping system
  - [ ] Standardized error responses
  - [ ] HTTP status code mapping
  - [ ] Error logging and monitoring

- [ ] Implement caching system

  - [ ] Cache text inputs and AI responses
  - [ ] Cache invalidation strategy
  - [ ] Redis integration for distributed caching
  - [ ] Cache hit/miss monitoring
