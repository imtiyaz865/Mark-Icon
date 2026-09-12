# React + Vite

## Project structure

- `frontend/` contains the React, Tailwind, GSAP, and chatbot UI.
- `backend/` contains the Express API and the server-only Gemini integration.

## Local development

Install dependencies in both packages:

```bash
cd frontend && npm install
cd ../backend && npm install
```

Copy `backend/.env.example` to `backend/.env` and set `GEMINI_API_KEY`. The key is read only by the backend and is never included in the frontend bundle.

Run the API and frontend in separate terminals:

```bash
cd backend && npm run dev
cd frontend && npm run dev
```

The Vite dev server proxies `/api/chat` to `http://localhost:8787`. The browser sends the conversation to the frontend proxy, Express receives it at `backend/routes/chat.js`, and Gemini is called only from the backend.

For production, run `cd frontend && npm run build`, set `backend/.env`, and run `cd backend && npm start`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
