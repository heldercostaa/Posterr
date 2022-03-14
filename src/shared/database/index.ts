import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};

// getConnectionOptions().then((options) => {
//   const newOptions = {
//     ...options,
//     // host: 'database',
//     host: 'localhost',
//   };

//   createConnection({
//     ...newOptions,
//   });
// });
