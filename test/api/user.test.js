/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const request = require('supertest');
const moment = require('moment');

const config = require('../../config').jwt;
const app = require('../../app');
const db = require('../../models');
const User = db.user;

const data = require('./test-data');
const baseUri = '/api/user';

afterAll(async () => {
  await db.sequelize.close();
  console.log('all done');
});

describe('User API', () => {

  //create user
  test('#1 create /user should return 200 with a valida JWT', async () => {
    const response = await request(app)
      .post(`${baseUri}`)
      .send(data.user)
      .expect('Content-Type', /json/)
      .expect(200);

    const payload = response.body;
    expect(payload.token).toBeDefined();
  });

  //get user by id
  test('#2 get /user/(:id) should return 200 with one user', async () => {
    const response = await request(app)
      .get(`${baseUri}/1`)
      //.set({ 'Authorization': 'Bearer ' + token })
      .expect('Content-Type', /json/)
      .expect(200);

    const payload = response.body;
    expect(payload.id).toBe(1);
  });

  //update test case
  test('#3 update /user/(:id) should return 200', async () => {
    const response = await request(app)
      .put(`${baseUri}/1`)
      .send(data.email)
      .expect(200);

    const payload = response.body;
    expect(payload.message).toBe('done');
  });

  //delete test case
  test('#4 delete /user/(:id) should return 200', async () => {
    const response = await request(app)
        .delete(`${baseUri}/1`)
        .expect(200);

    const payload = response.body;
    expect(payload.message).toBe('done');
  });


});
