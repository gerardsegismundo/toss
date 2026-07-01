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

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/a8aca5e6-9885-4682-869e-f7d6716e45d5" />

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
| 🚢 Docker Compose                  | One-command containerized deployment with MongoDB          |
| 🛡️ Rate Limiting                   | Per-route API throttling for chat, uploads, and general API |
| 🏠 Ollama Integration              | Local LLM support via Ollama (llama3.2, etc.)               |

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
  Ollama Local LLMs
  (Local/Private LLM Engine)
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

If no suitable local response is found, the application forwards the request to IBM Watson Assistant, OpenAI GPT, or, when configured, a local Ollama LLM.

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
- Ollama (local LLMs)
- WordPos (WordNet NLP)

## Other

- Axios
- Joi Validation
- Multer
- ExcelJS
- Server-Sent Events (SSE)
- Docker Compose
- express-rate-limit
