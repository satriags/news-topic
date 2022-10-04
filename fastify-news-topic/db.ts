import fastify from 'fastify';

import { fastifyPostgres } from '@fastify/postgres';

const db = fastify();

db.register(fastifyPostgres, {
  connectionString: 'postgres://postgres:root@localhost:5432/news_topic',
});

db.get('/calc', async () => {
  const client = await db.pg.connect();

  const sumResult = await client.query<{ sum: number }>('SELECT 2 + 2 as sum');

  client.release();

  return {
    sum: sumResult.rows,
  };
});

export { db };