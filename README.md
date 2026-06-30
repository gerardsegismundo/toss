# TOSS

TOSS (Test Organization Support System) is an interactive chatbot designed to assist **software testing and QA teams** within an organization. It provides a conversational interface where team members can ask questions and receive answers about test artifacts, metrics, automation resources, and reference materials — all from a centralized knowledge base.

### How It Works

1. **User sends a message** via the chat input on the homepage
2. **Local response matching**: The system first tries to find a matching answer from its own MongoDB database. It does this by:
   - Extracting keywords (entities, nouns, verbs) from the user's message using NLP (`wordpos`)
   - Looking up configured "responses" (question-answer pairs) that have matching entities
   - If enough entities match, it returns the stored answer or linked file
3. **Watson Assistant fallback**: If no local response is found, the message is forwarded to IBM Watson Assistant. Watson processes it using configured intents and workspaces (skills), and returns an AI-generated response
4. **File attachments**: Responses can include image URLs, external links, and rich text content — not just plain text
5. **Logging & analysis**: Every user message gets NLP-processed and stored in the "Filtered" collection, allowing administrators to analyze what users are asking

### Key Features

| Feature                   | Description                                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Chat Interface**        | Real-time conversational UI with chat bubbles, loading indicators, and auto-scroll                             |
| **Dual Response Engine**  | Local MongoDB responses + IBM Watson Assistant AI for intelligent replies                                      |
| **NLP Entity Extraction** | Uses `wordpos` to automatically extract proper nouns, common nouns, and verbs from messages                    |
| **Admin Dashboard**       | Full-featured admin panel to manage responses, Watson credentials, skills, intents, and uploads                |
| **Excel Import**          | Upload Excel files (.xls/.xlsx) and convert them to structured JSON data                                       |
| **Watson Integration**    | Create, rename, and delete Watson workspaces/skills; manage intents and training examples directly from the UI |
| **Response Management**   | CRUD operations for local response pairs (phrasing → content) with entity keyword matching                     |
| **Admin Authentication**  | Login page for secure access to the admin dashboard                                                            |

### Page Structure (Client)

| Route                  | Page                | Description                                            |
| ---------------------- | ------------------- | ------------------------------------------------------ |
| `/`                    | Home                | Main chatbot interface with chat input and message box |
| `/test-artifacts`      | Test Artifacts      | Placeholder page for test documentation                |
| `/metrics`             | Metrics             | Placeholder page for QA metrics/dashboard              |
| `/automation`          | Automation          | Placeholder page for automation resources              |
| `/reference-materials` | Reference Materials | Placeholder page for reference docs                    |
| `/contact-us`          | Contact Us          | Placeholder contact page                               |
| `/auth/login`          | Login               | Admin authentication                                   |
| `/admin-dashboard`     | Admin Dashboard     | Main admin panel with sidebar navigation               |

### Admin Dashboard Sections

| Section                 | Description                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| **Watson Assistant v1** | Configure Watson API credentials (API Key, URL, Version), list/create/rename/delete skills (workspaces) |
| **Discovery-8r**        | Placeholder for IBM Discovery integration                                                               |
| **Response**            | Create, edit, and delete local question-answer pairs with entity keyword matching                       |
| **Excel**               | Upload Excel spreadsheets and convert them to JSON format for data import                               |
| **Filtered**            | View all NLP-processed user messages with extracted nouns, verbs, and entities                          |

### Data Flow Diagram

```
User Message → Chat Interface → API Request (/api/response/request/:message)
                                    │
                                    ▼
                      ┌─────────────────────────┐
                      │  Check Local Responses  │
                      │  (MongoDB Response       │
                      │   collection - entity    │
                      │   matching)              │
                      └─────────┬───────────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
              Match Found?           No Match?
                    │                       │
                    ▼                       ▼
          ┌──────────────────┐    ┌──────────────────────┐
          │ Return local     │    │ Query Watson          │
          │ response or      │    │ Assistant via API     │
          │ file attachment  │    │ (if credentials are   │
          │                  │    │ configured)           │
          └──────────────────┘    └──────────────────────┘
                                           │
                                           ▼
                                 ┌──────────────────┐
                                 │ Return Watson     │
                                 │ response or file  │
                                 │ attachment        │
                                 └──────────────────┘

Every request is also processed by NLP (wordpos) and saved to the Filtered collection.
```

## Main Technologies Used

- **Language**: JavaScript (ES6+)
- **Frontend**: Vue.js 2 with Bootstrap-Vue
- **Backend**: Node.js / Express.js
- **Database**: MongoDB with Mongoose
- **AI/NLP**: IBM Watson Assistant v1 (`ibm-watson` v12+) and `wordpos` (WordNet-based NLP)

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
3. **IBM Watson Assistant** credentials (optional — the chatbot works with local responses only)
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

| Endpoint                                     | Description                            |
| -------------------------------------------- | -------------------------------------- |
| `GET /api/response/request/:request`         | Get chatbot response for a message     |
| `POST /api/response/search-phrasing`         | Search phrasing suggestions            |
| `GET /api/response-data`                     | List all responses                     |
| `GET /api/response-data/:id`                 | Get response by ID                     |
| `POST /api/response-data`                    | Create a response                      |
| `PATCH /api/response-data`                   | Update a response                      |
| `DELETE /api/response-data/:id`              | Delete a response                      |
| `GET /api/filtered`                          | List filtered (NLP-processed) messages |
| `DELETE /api/filtered/:id`                   | Delete a filtered item                 |
| `POST /api/excel/convert-file`               | Upload & convert Excel to JSON         |
| `GET /api/watson-assistant/credentials`      | Get Watson credentials                 |
| `POST /api/watson-assistant/credentials`     | Create Watson credentials              |
| `PUT /api/watson-assistant/credentials`      | Update Watson credentials              |
| `GET /api/watson-assistant/workspace`        | List Watson workspaces/skills          |
| `POST /api/watson-assistant/workspace`       | Create workspace                       |
| `PATCH /api/watson-assistant/workspace`      | Rename workspace                       |
| `DELETE /api/watson-assistant/workspace/:id` | Delete workspace                       |
| `GET /api/watson-assistant/intents/:id`      | List intents for a workspace           |
| `POST /api/watson-assistant/intents`         | Create an intent                       |

## Notes

- The **admin dashboard** can be accessed at `/admin-dashboard` to manage Watson Assistant credentials, skills, intents, responses, and uploaded Excel data.
- Watson Assistant credentials can be configured through the Admin UI — no need to hardcode them.
- The old `watson-developer-cloud` package has been replaced with `ibm-watson` v12.2.0.
- The project follows Domain-Driven Design principles with clear separation of concerns: domain models → application services → infrastructure → HTTP interfaces.
