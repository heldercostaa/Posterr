import express from 'express';

import { router } from './routes';

import './database';

const app = express();
app.use(express.json());
app.use(router);

const port = 3333;
app.listen(port, () => console.log(`✔ Server started on port ${port}!`));
