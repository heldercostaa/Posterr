import { createConnection, getConnectionOptions } from 'typeorm';

getConnectionOptions().then((options) => {
  const newOptions = {
    ...options,
    host: 'database',
  };

  createConnection({
    ...newOptions,
  });
});
