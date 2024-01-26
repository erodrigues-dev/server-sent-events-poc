const express = require('express');
const cors = require('cors');
const path = require('node:path');
const process = require('node:process');
const util = require('node:util');
const Service = require('./Service');
const Client = require('./Client');

const snf = require('simple-node-framework');
const sampleRouter = require('./api/modules/sample/route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public', 'dist')));

app.use(sampleRouter);

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
  snf.Singleton.log.info('Server', 'listening on port 3000');
});

app.get('/hc', (_, res) => {
  res.json({ ok: true });
});

let client;

app.post('/api/data', (req, res) => {
  if (client) {
    client.emit('count', { count: -1 });
  }

  res.json({ ok: true });
});

app.get('/api/events', (req, res) => {
  const service = new Service();
  client = new Client(res);

  console.log(req.headers);

  client.open();
  service.count(client);
});

const gracefullShutdown = async () => {
  await util.promisify(server.close).bind(server)();
  console.log('server is closed');
  console.log('fechar conexao: mongo');
  console.log('fechar conexao: redis');
};

process.on('SIGINT', async () => {
  console.log('server received: SIGINT');
  await gracefullShutdown();
});

process.on('SIGTERM', async () => {
  console.log('server received: SIGTERM');
  await gracefullShutdown();
});

process.on('uncaughtException', async () => {
  console.log('server received: uncaughtException');
  await gracefullShutdown();
});

process.on('unhandledRejection', async () => {
  console.log('server received: unhandledRejection');
  await gracefullShutdown();
});
