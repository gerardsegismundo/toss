# TOSS - Test Organization Support System

A chatbot single-page application built with Vue.js, Node.js/Express, and MongoDB, powered by IBM Watson Assistant.

## Main Technologies Used

- **Language**: JavaScript (ES6+)
- **Frontend**: Vue.js 2 with Bootstrap-Vue
- **Backend**: Node.js / Express.js
- **Database**: MongoDB with Mongoose
- **AI/NLP**: IBM Watson Assistant v1 (`ibm-watson` v12+)

## Project Architecture (Domain-Driven Design)

```
server/
├── domain/              # Domain models (entities & schemas)
│   ├── response/        # Response entity with Joi validation
│   ├── filtered/        # Filtered entity (NLP-processed messages)
│   ├── excel/           # Excel upload entity
│   └── watson/          # Watson credentials & file entities
├── application/         # Application services (business logic)
│   ├── responseService.js
│   ├── filteredService.js
│   └── watsonService.js
├── infrastructure/      # External integrations
│   ├── database/        # MongoDB connection
│   └── watson/          # IBM Watson client
├── interfaces/http/     # HTTP routes (Express routers)
│   ├── middleware/       # Error handler
│   ├── responseRoutes.js
│   ├── responseDataRoutes.js
│   ├── filteredRoutes.js
│   ├── excelRoutes.js
│   └── watsonAssistantRoutes.js
├── config/              # Configuration (keys, env)
├── startup/             # App bootstrap (logging, routes, DB)
└── index.js             # Entry point

client/
├── src/
│   ├── components/      # Vue components (client & admin)
│   ├── views/           # Page views (client & admin)
│   ├── store/           # Vuex state management
│   ├── router.js        # Vue Router config
│   ├── main.js          # Vue app bootstrap
│   └── vue.config.js    # Dev proxy config
└── package.json
```

## Requirements

1. **Node.js** v14+ (recommended: v18 or v20)
   - Download: https://nodejs.org/en/download/
2. **MongoDB** (local or cloud)
   - Community Download: https://www.mongodb.com/download-center/community
3. **IBM Watson Assistant** credentials (optional for local responses only)
   - API Reference: https://console.bluemix.net/apidocs/assistant

## Setup & Running

### 1. Clone and install dependencies

```bash
# Install root (server) dependencies
npm install

# Install client dependencies
cd client && npm install
cd ..
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required variables in `.env`:
```
MONGO_URI=mongodb://localhost/toss
PORT=5000
```

Watson credentials are optional (can be set via the Admin UI).

### 3. Run the application

**Development mode** (runs both server and client with hot-reload):
```bash
npm run dev
```

**Run server only**:
```bash
npm run server
```

**Run client only**:
```bash
npm run client
```

**Production mode**:
```bash
npm start
```

### 4. Access the application

- **Client**: http://localhost:8080
- **Admin Dashboard**: http://localhost:8080/admin-dashboard
- **API Server**: http://localhost:5000

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/response/request/:request` | Get chatbot response for a message |
| `POST /api/response/search-phrasing` | Search phrasing suggestions |
| `GET /api/response-data` | List all responses |
| `GET /api/response-data/:id` | Get response by ID |
| `POST /api/response-data` | Create a response |
| `PATCH /api/response-data` | Update a response |
| `DELETE /api/response-data/:id` | Delete a response |
| `GET /api/filtered` | List filtered (NLP-processed) messages |
| `DELETE /api/filtered/:id` | Delete a filtered item |
| `POST /api/excel/convert-file` | Upload & convert Excel to JSON |
| `GET /api/watson-assistant/credentials` | Get Watson credentials |
| `POST /api/watson-assistant/credentials` | Create Watson credentials |
| `PUT /api/watson-assistant/credentials` | Update Watson credentials |
| `GET /api/watson-assistant/workspace` | List Watson workspaces/skills |
| `POST /api/watson-assistant/workspace` | Create workspace |
| `PATCH /api/watson-assistant/workspace` | Rename workspace |
| `DELETE /api/watson-assistant/workspace/:id` | Delete workspace |
| `GET /api/watson-assistant/intents/:id` | List intents for a workspace |
| `POST /api/watson-assistant/intents` | Create an intent |

## Notes

- The **admin dashboard** can be accessed at `/admin-dashboard` to manage Watson Assistant credentials, skills, intents, responses, and uploaded Excel data.
- Watson Assistant credentials can be configured through the Admin UI — no need to hardcode them.
- The old `watson-developer-cloud` package has been replaced with `ibm-watson` v12.2.0.
- The project follows Domain-Driven Design principles with clear separation of concerns: domain models → application services → infrastructure → HTTP interfaces.