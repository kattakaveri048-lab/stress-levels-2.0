# StressCare AI — Full-stack mini project

A simple educational website about stress levels and coping mechanisms. It includes a responsive frontend, a Node.js/Express backend, an informal self-check questionnaire, coping tips, and an AI chat endpoint connected to a locally running Ollama model.

## Requirements
- Node.js 18 or later (includes `fetch`)
- Ollama installed locally for AI chat

## Run on your computer
1. Extract this ZIP.
2. Open Command Prompt or a terminal inside the extracted `StressCare_AI_FullStack` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. (Optional) Copy `.env.example` to `.env` and change the model name if needed.
5. Install and start Ollama, then download the default model:
   ```bash
   ollama pull llama3.2
   ```
   Keep Ollama running.
6. Start the website:
   ```bash
   npm start
   ```
7. Open **http://localhost:3000** in your browser.

The website and self-check work without Ollama. The AI chat requires the backend and Ollama model to be running.

## API endpoints
- `GET /api/health` — confirms that the Express server is running.
- `POST /api/chat` — JSON body: `{ "message": "I feel stressed about exams" }`; forwards the message to Ollama.

## Project structure
```text
StressCare_AI_FullStack/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .env.example
├── package.json
├── server.js
└── README.md
```

## Deploying
This is a full-stack Node.js app. GitHub stores the source code but does not run the Express backend. Deploy it to a Node.js hosting service and configure `OLLAMA_URL` and `OLLAMA_MODEL` there. A local Ollama address such as `localhost` is not reachable from most cloud hosts; use a reachable hosted model/API endpoint for a public deployment. Do not put private API keys in frontend files or commit `.env` secrets.

## Important note
The questionnaire is an informal educational self-check, not a validated clinical screening tool or diagnosis. The chatbot provides general information and is not a substitute for professional care.
