import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { connectDatabase } from './config/database.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

export const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);

export const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
  }),
);
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});
app.use('/api/users/', usersRouter);
app.use('/api/teams/', teamsRouter);
app.use('/api/activities/', activitiesRouter);
app.use('/api/leaderboard/', leaderboardRouter);
app.use('/api/workouts/', workoutsRouter);

app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'API route not found' });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};
app.use(errorHandler);

export async function startServer() {
  await connectDatabase();
  return app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening at ${baseUrl}`);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  startServer().catch((error: unknown) => {
    console.error('Unable to start OctoFit API:', error);
    process.exitCode = 1;
  });
}
