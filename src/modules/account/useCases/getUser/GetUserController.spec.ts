import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/app';
import createConnection from '@shared/database';

let connection: Connection;

describe('Get User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to get user by username', async () => {
    await request(app).post('/user').send({
      username: 'cat',
    });

    const response = await request(app).get(`/user/cat`);

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('cat');
  });

  it('should not be able to get user if username does not exists', async () => {
    const response = await request(app).get(`/user/cat`);

    expect(response.status).toBe(400);
  });
});
