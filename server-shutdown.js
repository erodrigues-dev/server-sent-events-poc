import util from 'node:util';
import process from 'node:process';

export const useGracefullShutdown = (server) => {
  const shutdown = async () => {
    await util.promisify(server.close).bind(server)();
    console.log('server is closed');
    console.log('fechar conexao: mongo');
    console.log('fechar conexao: redis');
  };

  process.on('SIGINT', async () => {
    console.log('server received: SIGINT');
    await shutdown();
  });

  process.on('SIGTERM', async () => {
    console.log('server received: SIGTERM');
    await shutdown();
  });

  process.on('uncaughtException', async () => {
    console.log('server received: uncaughtException');
    await shutdown();
  });

  process.on('unhandledRejection', async () => {
    console.log('server received: unhandledRejection');
    await shutdown();
  });
};
