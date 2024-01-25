import express from 'express';
import cors from 'cors';
import path from 'node:path';

import { useGracefullShutdown } from './server-shutdown.js';
import countRouter from './api/modules/count/router.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join('.', 'public', 'dist')));
app.use(countRouter);

app.get('/api/hc', (_, res) => {
  res.json({ ok: true });
});

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});

useGracefullShutdown(server);
