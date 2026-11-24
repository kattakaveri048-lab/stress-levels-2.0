require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'StressCare AI' }));
app.post('/api/chat', async (req, res) => {
  const message = String(req.body.message || '').trim();
  if (!message) return res.status(400).json({ error: 'Please enter a message.' });
  try {
    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        messages: [
          { role: 'system', content: 'You are StressCare AI, a kind wellness information assistant. Offer general, practical stress-management ideas, avoid diagnosing or replacing professional care, and encourage urgent local help if someone may be in immediate danger.' },
          { role: 'user', content: message }
        ]
      })
    });
    if (!response.ok) throw new Error(`Ollama returned ${response.status}`);
    const data = await response.json();
    res.json({ reply: data.message?.content || 'I could not create a response. Please try again.' });
  } catch (error) {
    res.status(503).json({ error: 'Could not connect to Ollama. Make sure Ollama is running and the selected model is installed.', details: error.message });
  }
});

app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(PORT, () => console.log(`StressCare AI running at http://localhost:${PORT}`));
