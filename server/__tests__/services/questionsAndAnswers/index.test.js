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

// testing integration tests
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

    expect(serverResponse.statusMessage).toBe('Created');
    expect(serverResponse.statusCode).toBe(201);

  });

  it('should get inserted question via GET route', async () => {
    const requestPayload = {
      body: 'this is is a test body',
      name: 'this is a test name',
      email: 'lorem@email.com',
      product_id: 55555,
    };
    const body = requestPayload.body;
    const name = requestPayload.name;
    const email = requestPayload.email;
    const product_id = requestPayload.product_id;

    await server.inject({
      url: `/qa/questions`,
      method: 'POST',
      payload: requestPayload,
    });

    const params = new URLSearchParams({ product_id })
    const serverResponse = await server.inject({
      url: `/qa/questions/?${params}`,
      method: 'GET',
    })
    const result = serverResponse.json().results[0]
    console.warn(serverResponse.json())
    expect(serverResponse.statusCode).toBe(200);
    expect(serverResponse.json().product_id).toBe(product_id);
    expect(result.question_body).toBe(body);
    expect(result.asker_name).toBe(name)
    expect(result.asker_email).toBe(email)
  })

});

