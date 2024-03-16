import mariadb, { PoolConfig } from 'mariadb';
import { Elysia } from 'elysia';

export const elysiaMariaDB = async (config: PoolConfig) => {
  const pool = mariadb.createPool(config);
  return new Elysia().decorate('db', await pool.getConnection()).onAfterHandle(({ db }) => {
    db.release();
  });
};
