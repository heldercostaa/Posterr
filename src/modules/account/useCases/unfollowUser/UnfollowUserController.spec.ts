import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/app';
import createConnection from '@shared/database';

let connection: Connection;

describe('Unfollow User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to unfollow a user', async () => {
    await request(app).post('/user').send({
      username: 'cat',
    });

    await request(app).post('/user').send({
      username: 'dog',
    });

    await request(app).post('/user/follow/dog').set('username', 'cat').send();

    let catResponse = await request(app).get('/user/cat').send();
    let dogResponse = await request(app).get('/user/dog').send();

    expect(catResponse.body.following.length).toBe(1);
    expect(dogResponse.body.followers.length).toBe(1);

    await request(app).post('/user/unfollow/dog').set('username', 'cat').send();

    catResponse = await request(app).get('/user/cat').send();
    dogResponse = await request(app).get('/user/dog').send();

    expect(catResponse.body.following.length).toBe(0);
    expect(dogResponse.body.followers.length).toBe(0);
  });

  it('should not be able to unfollow yourself', async () => {
    await request(app).post('/user').send({
      username: 'cat',
    });

    const response = await request(app)
      .post('/user/unfollow/cat')
      .set('username', 'cat')
      .send();

    expect(response.status).toBe(400);
  });

  it('should not be able to unfollow a non existing user', async () => {
    await request(app).post('/user').send({
      username: 'cat',
    });

    const response = await request(app)
      .post('/user/unfollow/non_existing')
      .set('username', 'cat')
      .send();

    expect(response.status).toBe(400);
  });

  it('should not be able to unfollow from non existing user', async () => {
    await request(app).post('/user').send({
      username: 'cat',
    });

    const response = await request(app)
      .post('/user/unfollow/cat')
      .set('username', 'non_existing')
      .send();

    expect(response.status).toBe(400);
  });

  it('should not be able to unfollow a user if is not a follower', async () => {
    await request(app).post('/user').send({
      username: 'cat',
    });

    await request(app).post('/user').send({
      username: 'dog',
    });

    const response = await request(app)
      .post('/user/unfollow/dog')
      .set('username', 'cat')
      .send();

    expect(response.status).toBe(400);
  });
});
