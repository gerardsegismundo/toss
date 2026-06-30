# 📘 Developer Guide

This document provides technical context for developers maintaining or extending this project. It focuses on system architecture, setup, workflows, and design decisions that are intentionally excluded from the main README.

---

## 1. System Overview

This application is a full-stack chatbot platform built with a domain-driven backend architecture and a Vue-based frontend.

### Core Capabilities

- Chat interface with local + LLM-based responses
- Admin dashboard for managing responses, NLP data, and integrations
- Optional IBM Watson Assistant integration
- Optional OpenAI LLM streaming (SSE)
- Excel upload → JSON conversion pipeline
- NLP-based message filtering and entity extraction

---

## 2. High-Level Architecture

### Request Flow

```text
Client (Vue)
↓
HTTP Interfaces (Express Routes)
↓
Application Layer (Business Logic)
↓
Domain Layer (Entities + Validation)
↓
Infrastructure Layer (DB + External APIs)
```

### Architecture Layers

- **Interfaces (HTTP)**
  - Express routes and middleware
  - Request validation and response handling

- **Application Layer**
  - Business logic orchestration
  - LLM service integration (OpenAI streaming)
  - Response, filtering, and Watson services

- **Domain Layer**
  - Core entities and schemas
  - Validation rules (Joi / schema-based)

- **Infrastructure Layer**
  - MongoDB connection
  - IBM Watson client
  - External API integrations

---

## 3. Project Structure

```text
server/
├── domain/
│   ├── response/
│   ├── filtered/
│   ├── excel/
│   └── watson/
│
├── application/
│   ├── llmService.js
│   ├── responseService.js
│   ├── filteredService.js
│   └── watsonService.js
│
├── infrastructure/
│   ├── database/
│   └── watson/
│
├── interfaces/http/
│   ├── middleware/
│   ├── responseRoutes.js
│   ├── responseDataRoutes.js
│   ├── filteredRoutes.js
│   ├── excelRoutes.js
│   └── watsonAssistantRoutes.js
│
├── config/
├── startup/
└── index.js

client/
└── src/
    ├── components/
    ├── views/
    ├── store/
    ├── router.js
    └── main.js
```

---

## 4. Client Routes (UI Structure)

| Route                  | Page                | Description                  |
| ---------------------- | ------------------- | ---------------------------- |
| `/`                    | Home                | Chat interface               |
| `/test-artifacts`      | Test Artifacts      | Placeholder page             |
| `/metrics`             | Metrics             | QA dashboard placeholder     |
| `/automation`          | Automation          | Automation tools placeholder |
| `/reference-materials` | Reference Materials | Documentation placeholder    |
| `/contact-us`          | Contact Us          | Contact page                 |
| `/auth/login`          | Login               | Admin authentication         |
| `/admin-dashboard`     | Admin Dashboard     | Main admin panel             |

---

## 5. Admin Dashboard Modules

| Module                  | Description                                         |
| ----------------------- | --------------------------------------------------- |
| Watson Assistant        | Configure credentials and manage workspaces/intents |
| Discovery (Placeholder) | Reserved for IBM Discovery integration              |
| Response Manager        | CRUD Q&A with entity keyword matching               |
| Excel Importer          | Upload Excel files and convert to JSON              |
| Filtered NLP View       | Displays processed messages with extracted entities |

---

## 6. Core Integrations

### 6.1 OpenAI LLM (Optional)

- Located in `application/llmService.js`
- Uses Server-Sent Events (SSE) for streaming responses
- Falls back to local response system if not configured

```bash
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

### 6.2 IBM Watson Assistant (Optional)

- Managed via admin dashboard
- Supports workspace and intent management
- Can operate independently of LLM system

### 6.3 MongoDB

- Primary datastore
- Stores:
  - Responses
  - Filtered NLP messages
  - Excel uploads
  - Watson configuration data

---

## 7. Environment Variables

### Required

```bash
MONGO_URI=mongodb://localhost/toss
PORT=5000
```

### Optional

```bash
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

> **Note:** Watson credentials can be configured via the Admin UI.

---

## 8. Setup & Running

### 1. Install dependencies

```bash
git clone https://github.com/gerardsegismundo/toss.git
cd toss

npm install
cd client && npm install
cd ..
```

### 2. Environment setup

```bash
cp .env.example .env
```

### 3. Run development environment

```bash
npm run dev
```

### 4. Run separately

```bash
npm run server
npm run client
```

### 5. Access application

```text
Client:         http://localhost:8080
Admin Dashboard: http://localhost:8080/admin-dashboard
API:            http://localhost:5000
```

---

## 9. API Overview

### Response Module

```text
GET    /api/response/request/:request
POST   /api/response/chat (SSE streaming)
GET    /api/response-data
POST   /api/response-data
PATCH  /api/response-data
DELETE /api/response-data/:id
```

### Filtered NLP Module

```text
GET  /api/filtered
DELETE /api/filtered/:id
```

### Excel Module

```text
POST /api/excel/convert-file
```

### Watson Module

```text
GET    /api/watson-assistant/credentials
POST   /api/watson-assistant/credentials
PUT    /api/watson-assistant/credentials
GET    /api/watson-assistant/workspace
POST   /api/watson-assistant/workspace
PATCH  /api/watson-assistant/workspace
DELETE /api/watson-assistant/workspace/:id
```

---

## 10. Data Flow Example

### Chat Message Flow

```text
User message
   ↓
Frontend chat input
   ↓
POST /api/response/chat
   ↓
LLM Service (OpenAI optional)
   ↓
Fallback: MongoDB response system
   ↓
SSE streaming response
   ↓
Frontend renders output
```

---

## 11. Design Decisions

### Domain-Driven Design (DDD)

- Separates business logic from infrastructure
- Improves maintainability and scalability

### Vue Frontend

- Lightweight SPA architecture
- Clear separation of client and admin views

### MongoDB

- Flexible schema for chatbot data
- Fast iteration during development

### Service Layer Pattern

- Keeps controllers thin
- Centralizes business logic
- Improves testability

---

## 12. Known Limitations

- Limited schema enforcement beyond validation layer
- No centralized production logging
- External services (Watson/OpenAI) are optional and inconsistently required
- Minimal automated test coverage

---

## 13. Future Improvements

- Add unit/integration testing (Jest / Supertest)
- Introduce Redis caching for chat responses
- Add CI/CD pipeline (GitHub Actions)
- Improve observability (structured logging)
- Migrate core services to TypeScript
- Replace placeholder modules (Discovery) with production features

---

## 14. Contribution Guidelines

- Follow existing folder structure (DDD layers)
- Keep controllers thin; business logic goes into services
- Add validation at domain layer
- Document new environment variables
- Update this guide when architecture changes
