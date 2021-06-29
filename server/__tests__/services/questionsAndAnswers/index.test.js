const fastify = require('fastify')
const createTestInstance = require('../../../index');
const questions = require('../../../qa/service');
let server;

beforeAll(async () => {

  const testDB = require('knex')({
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '',
      database: 'testing',
    }
  })

  server = await createTestInstance(testDB)
  await server.ready((err) => {
    if (err) throw err;
  });

  await server.qna.db('questions').del();
});

beforeEach(async () => {
  await server.qna.db('questions').del();
});

afterEach(async () => {
  await server.qna.db('questions').del();
});

afterAll(async () => {
  await server.close();
});

describe('questions', () => {

  it('should create a new question via POST route', async () => {
    const requestPayload = {
      body: 'this is is a test body',
      name: 'this is a test name',
      email: 'lorem@email.com',
      product_id: 123456,
    };

    const serverResponse = await server.inject({
      url: '/qa/questions',
      method: 'POST',
      payload: requestPayload,
    });

    const insertedData = await server.qna.db('questions')
    .where({ id_products: requestPayload.product_id})
    const question = insertedData[0];

    expect(serverResponse.statusMessage).toBe('Created');
    expect(question.id_products).toEqual(requestPayload.product_id);
    expect(question.question_body).toEqual(requestPayload.body);
    expect(question.asker_name).toEqual(requestPayload.name);
    expect(question.asker_email).toEqual(requestPayload.email);
    // expect()
    // const insertedQuestion = await server.qna.db('')

    console.warn(insertedData);
  });

})