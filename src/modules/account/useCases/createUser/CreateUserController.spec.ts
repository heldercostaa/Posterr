import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/app';
import createConnection from '@shared/database';

let connection: Connection;

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/user').send({
      username: 'cat',
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new user if name already exists', async () => {
    const response = await request(app).post('/user').send({
      username: 'cat',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to have username longer than 14 characters', async () => {
    const response = await request(app).post('/user').send({
      username: 'cattttttttttttt',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to have username with special characters', async () => {
    const response = await request(app).post('/user').send({
      username: '!cat',
    });

    expect(response.status).toBe(400);

    const response2 = await request(app).post('/user').send({
      username: 'ca t',
    });

    expect(response2.status).toBe(400);
  });
});
