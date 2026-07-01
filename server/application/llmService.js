const OpenAI = require('openai');
const { Response } = require('../domain/response/Response');

let knowledgeBase = [];
let lastLoaded = 0;
const LOAD_INTERVAL = 60000;

async function loadKnowledgeBase() {
  try {
    const responses = await Response.find({}).select('phrasing entities content');
    knowledgeBase = responses.map(r => ({
      phrasing: r.phrasing,
      entities: r.entities,
      content: r.content
    }));
    lastLoaded = Date.now();
    console.log(`LLM: Loaded ${knowledgeBase.length} knowledge base items`);
  } catch (err) {
    console.error('LLM: Failed to load knowledge base:', err.message);
  }
}

async function ensureKnowledgeBase() {
  if (knowledgeBase.length === 0 || Date.now() - lastLoaded > LOAD_INTERVAL) {
    await loadKnowledgeBase();
  }
}

function buildSystemPrompt() {
  let prompt = `You are TOSS (Test Organization Support System), an expert QA testing assistant for a software organization. You help team members find information about test artifacts, metrics, automation, and reference materials.

Rules:
- Answer questions concisely and accurately based on the knowledge base below.
- If the question is NOT covered by the knowledge base, use your general software testing knowledge but clearly state that the information is from general knowledge.
- If you don't know the answer, say "I don't have information about that in my knowledge base."
- Keep answers to 2-3 paragraphs max unless asked for detail.
- Format responses with markdown when appropriate (bullet points, bold, etc.).
- Never invent fake knowledge base entries.

Knowledge Base:
`;
  
  knowledgeBase.forEach((item, i) => {
    prompt += `${i + 1}. Question: "${item.phrasing}"\n   Answer: ${item.content}\n   Keywords: ${(item.entities || []).join(', ')}\n\n`;
  });

  if (knowledgeBase.length === 0) {
    prompt += '(No knowledge base entries loaded yet. Use general QA/testing knowledge.)\n';
  }
  
  return prompt;
}

const PROVIDERS = {
  openai: 'openai',
  ollama: 'ollama'
};

function detectProvider() {
  if (process.env.OPENAI_API_KEY) return PROVIDERS.openai;
  if (process.env.OLLAMA_BASE_URL || process.env.OLLAMA_MODEL) return PROVIDERS.ollama;
  return null;
}

function isConfigured() {
  return detectProvider() !== null;
}

function getActiveProvider() {
  return detectProvider();
}

// ─── OpenAI Provider ─────────────────────────────────────────

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

async function* streamOpenAI(messages) {
  const client = getOpenAIClient();
  const stream = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages,
    stream: true,
    max_tokens: 1500,
    temperature: 0.3,
  });
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) yield content;
  }
}

async function completeOpenAI(messages) {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages,
    max_tokens: 1500,
    temperature: 0.3,
  });
  return response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
}

// ─── Ollama Provider ──────────────────────────────────────────

const OLLAMA_BASE = (process.env.OLLAMA_BASE_URL || 'http://localhost:11434').replace(/\/+$/, '');
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2:3b';

async function* streamOllama(messages) {
  const response = await fetch(`${OLLAMA_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream: true,
      options: { temperature: 0.3, num_predict: 1500 }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const json = JSON.parse(line);
        if (json.done) return;
        if (json.message?.content) {
          yield json.message.content;
        }
      } catch (e) {
        // skip malformed JSON lines
      }
    }
  }
}

async function completeOllama(messages) {
  const response = await fetch(`${OLLAMA_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream: false,
      options: { temperature: 0.3, num_predict: 1500 }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.message?.content || 'Sorry, I could not generate a response.';
}

// ─── Unified API ──────────────────────────────────────────────

function buildMessages(message, conversationHistory = []) {
  return [
    { role: 'system', content: buildSystemPrompt() },
    ...conversationHistory.slice(-20),
    { role: 'user', content: message },
  ];
}

async function* getStreamingResponse(message, conversationHistory = []) {
  await ensureKnowledgeBase();
  const provider = detectProvider();
  const messages = buildMessages(message, conversationHistory);

  if (provider === PROVIDERS.openai) {
    yield* streamOpenAI(messages);
  } else if (provider === PROVIDERS.ollama) {
    yield* streamOllama(messages);
  } else {
    yield 'No LLM provider configured. Set OPENAI_API_KEY or OLLAMA_BASE_URL/OLLAMA_MODEL in your .env file.';
  }
}

async function getResponse(message, conversationHistory = []) {
  await ensureKnowledgeBase();
  const provider = detectProvider();
  const messages = buildMessages(message, conversationHistory);

  if (provider === PROVIDERS.openai) {
    return await completeOpenAI(messages);
  } else if (provider === PROVIDERS.ollama) {
    return await completeOllama(messages);
  } else {
    return 'No LLM provider configured. Set OPENAI_API_KEY or OLLAMA_BASE_URL/OLLAMA_MODEL in your .env file.';
  }
}

module.exports = {
  getStreamingResponse,
  getResponse,
  loadKnowledgeBase,
  isConfigured,
  getActiveProvider
};