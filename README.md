# 🤖 TOSS (Test Organization Support System)

<p align="center">
  <strong>An AI-powered knowledge assistant for QA teams.</strong><br>
  <em>Originally built in March 2019 using IBM Watson Assistant.<br>
  Modernized with Large Language Models to demonstrate the evolution of conversational AI.</em>
</p>

<p align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-2.x-42b883?logo=vuedotjs)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)
![IBM Watson](https://img.shields.io/badge/IBM-Watson_Assistant-052FAD?logo=ibm)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>

---

# 📖 Overview

**TOSS (Test Organization Support System)** is an intelligent chatbot designed to help software testing and QA teams quickly find information through natural conversation.

Instead of searching through documentation, spreadsheets, or internal knowledge bases, team members can simply ask questions and receive relevant answers about:

- 🧪 Test artifacts
- 📊 QA metrics
- 🤖 Automation resources
- 📚 Reference materials
- 📄 Internal documentation
- 🔍 Knowledge base content

The application combines traditional Natural Language Processing (NLP), structured knowledge retrieval, and modern Large Language Models (LLMs) to create a conversational assistant for enterprise environments.

---

# 🚀 Why This Project Exists

This project has an interesting history.

I originally built **TOSS in March 2019** during my internship, several years before ChatGPT and today's LLM-powered assistants became mainstream.

At the time, conversational AI primarily relied on:

- IBM Watson Assistant
- Intent classification
- Entity recognition
- NLP pipelines
- Rule-based dialogue
- Knowledge-base matching

My goal was simple:

> Allow users to ask questions naturally and receive accurate answers from an organization's internal knowledge base.

Although the technology available in 2019 was very different, the overall objective is remarkably similar to what many modern AI assistants accomplish today.

---

# 🔄 Why I'm Revisiting It

The rise of Large Language Models has transformed how conversational AI applications are built.

Rather than starting from scratch, I wanted to modernize one of my earliest AI projects and explore how a traditional intent-based chatbot can evolve into an LLM-powered assistant.

This repository now serves as both:

- a snapshot of conversational AI before the LLM era
- an ongoing modernization project using today's AI technologies

Instead of replacing the original architecture, the project demonstrates how existing enterprise chatbot solutions can be enhanced with generative AI while continuing to leverage structured organizational knowledge.

---

# ✨ Key Features

| Feature                            | Description                                                |
| ---------------------------------- | ---------------------------------------------------------- |
| 💬 Interactive Chat Interface      | Clean conversational UI built with Vue.js                  |
| 🧠 Intelligent Knowledge Retrieval | Searches local knowledge before using AI                   |
| 🤖 IBM Watson Assistant            | Original intent-based conversational engine                |
| 🚀 OpenAI Integration              | Modern GPT-powered responses with streaming                |
| 📂 Knowledge Base Management       | CRUD interface for question/answer content                 |
| 🔍 NLP Entity Extraction           | Automatic noun, verb, and entity recognition using WordPos |
| 📈 Conversation Analytics          | Stores processed user messages for analysis                |
| 📊 Excel Import                    | Convert spreadsheets into structured knowledge             |
| 🔐 Admin Dashboard                 | Manage chatbot configuration and content                   |
| ⚡ Streaming Responses             | Server-Sent Events (SSE) for real-time AI responses        |

---

# 🏗️ Architecture

```text
                User
                 │
                 ▼
          Vue.js Chat Client
                 │
                 ▼
          Express.js API Layer
                 │
     ┌───────────┴───────────┐
     │                       │
     ▼                       ▼
MongoDB Knowledge      IBM Watson Assistant
Base Matching          (Original AI Engine)
     │
     ▼
 OpenAI GPT Integration
 (Modern LLM Engine)
     │
     ▼
 Natural Language Response
```

---

# 🧠 How It Works

When a user submits a question, TOSS follows a layered retrieval process:

### 1️⃣ User sends a message

The request is submitted through the chat interface.

### 2️⃣ NLP Processing

The application extracts:

- nouns
- verbs
- entities

using the **WordPos** NLP library.

### 3️⃣ Local Knowledge Search

The extracted entities are compared against the MongoDB knowledge base.

If a relevant answer already exists, it is returned immediately.

### 4️⃣ AI Fallback

If no suitable local response is found, the application forwards the request to IBM Watson Assistant or, when configured, OpenAI GPT.

### 5️⃣ Response Returned

The chatbot responds with:

- formatted text
- links
- images
- documentation
- AI-generated answers

depending on the configured response source.

---

# 🛠️ Technology Stack

## Frontend

- Vue.js 2
- BootstrapVue
- Vue Router
- Vuex

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## AI & NLP

- IBM Watson Assistant
- OpenAI GPT
- WordPos (WordNet NLP)

## Other

- Axios
- Joi Validation
- Multer
- ExcelJS
- Server-Sent Events (SSE)

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

## Project Architecture (Domain-Driven Design)

```
server/
├── domain/              # Domain models (entities & schemas)
│   ├── response/        # Response entity with Joi validation
│   ├── filtered/        # Filtered entity (NLP-processed messages)
│   ├── excel/           # Excel upload entity
│   └── watson/          # Watson credentials & file entities
├── application/         # Application services (business logic)
│   ├── llmService.js    # NEW: OpenAI LLM integration with streaming
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
4. **OpenAI API key** (optional — enables LLM-powered responses with streaming)
   - Sign up: https://platform.openai.com/api-keys

## Setup & Running

### 1. Clone and install dependencies

```bash
# Clone the repo
git clone https://github.com/gerardsegismundo/toss.git
cd toss

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

Optional variables (for LLM-powered responses):

```
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4o-mini
```

Watson credentials are also optional (can be set via the Admin UI).

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

## Testing & Cost Guide

### Quick Start Checklist

- [ ] Node.js installed (v18+)
- [ ] MongoDB running (local or Atlas)
- [ ] `npm install` completed in root and client folders
- [ ] `.env` file created with `MONGO_URI`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:8080
- [ ] Click the chat input to start a conversation
- [ ] For admin features, go to http://localhost:8080/admin-dashboard

### How to Test Without Any Cost

1. **Skip Watson**: Don't configure Watson credentials. The app will use local responses only
2. **Skip OpenAI**: Don't set `OPENAI_API_KEY`. The app falls back to the existing entity-matching system
3. **Use local MongoDB**: Install MongoDB Community for free
4. **Add test data**: Go to the Admin Dashboard → Response → Create a few test Q&A pairs with entity keywords. Then try asking questions on the chat page

### Cost Breakdown

#### Free Features (no cost at all)

| Feature                                | Cost   |
| -------------------------------------- | ------ |
| Running the app locally                | **$0** |
| MongoDB Community (local)              | **$0** |
| MongoDB Atlas (free tier, 512MB)       | **$0** |
| Chat interface & admin UI              | **$0** |
| Local response matching (entity-based) | **$0** |
| Excel file upload & conversion         | **$0** |
| NLP word extraction (wordpos)          | **$0** |

#### Optional Paid Features

| Feature                                | Cost                                                                                                        | When You Need It                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **IBM Watson Assistant**               | Free tier: 10,000 API calls/month. Paid: ~$0.0025/call after                                                | Only if you want Watson-powered responses (the app works without it using local responses)                             |
| **OpenAI API** (LLM feature)           | GPT-4o-mini: ~$0.15/1M input tokens, ~$0.60/1M output tokens. Typical chat: ~$0.001–$0.005 per conversation | Only if you want AI-powered answers. **Completely optional** — the app falls back to local responses if not configured |
| **MongoDB Atlas** (if not using local) | Free tier: 512MB storage — **$0**. Paid: ~$57/month for dedicated cluster                                   | Only if you don't want to install MongoDB locally                                                                      |

### If You Want to Test the LLM Feature

1. Get an OpenAI API key: https://platform.openai.com/api-keys
2. Add it to `.env`:
   ```
   OPENAI_API_KEY=sk-your-key-here
   OPENAI_MODEL=gpt-4o-mini
   ```
3. The free trial gives you **$5–$18 in credits** when you first sign up, which is enough for thousands of test conversations
4. After credits run out, GPT-4o-mini costs about **$0.001 per typical chat** (a few hundred messages per dollar)

## API Endpoints

| Endpoint                                     | Description                            |
| -------------------------------------------- | -------------------------------------- |
| `POST /api/response/chat`                    | **NEW** Streaming chat with LLM (SSE)  |
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
- A new **LLM service** (`server/application/llmService.js`) provides optional OpenAI integration with streaming responses via SSE. When configured, it uses the local Response collection as a knowledge base for context-aware answers.
