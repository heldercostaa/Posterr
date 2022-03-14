import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/app';
import createConnection from '@shared/database';

let connection: Connection;

describe('Follow User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to follow a user', async () => {
    await request(app).post('/user').send({
      username: 'cat',
    });

    await request(app).post('/user').send({
      username: 'dog',
    });

    await request(app).post('/user/follow/dog').set('username', 'cat').send();

    const catResponse = await request(app).get('/user/cat').send();

    expect(catResponse.body.following[0].username).toBe('dog');

    const dogResponse = await request(app).get('/user/dog').send();

    expect(dogResponse.body.followers[0].username).toBe('cat');
  });

  it('should not be able to follow yourself', async () => {
    await request(app).post('/user').send({
      username: 'cat',
    });

    const response = await request(app)
      .post('/user/follow/cat')
      .set('username', 'cat')
      .send();

    expect(response.status).toBe(400);
  });

  it('should not be able to follow a non existing user', async () => {
    await request(app).post('/user').send({
      username: 'cat',
    });

    const response = await request(app)
      .post('/user/follow/non_existing')
      .set('username', 'cat')
      .send();

    expect(response.status).toBe(400);
  });

  it('should not be able to follow from non existing user', async () => {
    await request(app).post('/user').send({
      username: 'cat',
    });

    const response = await request(app)
      .post('/user/follow/cat')
      .set('username', 'non_existing')
      .send();

    expect(response.status).toBe(400);
  });

  it('should not be able to follow a user twice', async () => {
    await request(app).post('/user').send({
      username: 'cat',
    });

    await request(app).post('/user').send({
      username: 'dog',
    });

    await request(app).post('/user/follow/dog').set('username', 'cat').send();
    const response = await request(app)
      .post('/user/follow/dog')
      .set('username', 'cat')
      .send();

    expect(response.status).toBe(400);
  });
});
