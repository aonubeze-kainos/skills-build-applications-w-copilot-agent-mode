# OctoFit Tracker frontend

React 19 presentation tier built with Vite, React Router, and Bootstrap.

## Run locally

Start the API on port `8000`, then run the frontend:

```bash
npm run dev --prefix octofit-tracker/frontend
```

When `VITE_CODESPACE_NAME` is unset, the frontend uses `http://localhost:8000`.

## Run in GitHub Codespaces

Define `VITE_CODESPACE_NAME` with your Codespace name so API requests use
`https://<codespace-name>-8000.app.github.dev`. For example, create
`octofit-tracker/frontend/.env.local` with:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Replace the example value with the Codespaces `CODESPACE_NAME` value, then
restart Vite after changing the file. Vite environment variables are included
in browser code, so do not put secrets in this file.

Collection views accept either a JSON array or a paginated object containing
`results`, `data`, or `items`.
