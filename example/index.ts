import { Elysia } from 'elysia';
import { elysiaMariaDB } from '../src';

const app = new Elysia()
  .use(
    elysiaMariaDB({
      host: 'localhost',
      port: 3306,
      user: 'USERNAME',
      password: 'PASSWORD',
      database: 'DATABASE',
      connectionLimit: 5,
      timezone: '+00:00',
    }),
  )
  .get('/', async ({ db }) => {
    const users = await db.query('SELECT * FROM users');
    return users.map((item: any) => ({
      name: item.name,
    }));
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
