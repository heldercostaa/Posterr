import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const dbName =
    process.env.NODE_ENV === 'test'
      ? 'posterr_testdb'
      : defaultOptions.database;

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database: dbName,
    })
  );
};
