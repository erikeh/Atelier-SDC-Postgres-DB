import { Knex } from 'knex';
const fastify = require('fastify');
const QuestionsAndAnswers = require('./qa/service');

const app = fastify({
  logger: true,
  prettyPrint: true,
});

const db: Knex = require('./db/');

// model classes
async function decorateFastifyInstance(): Promise<void> {
  const questionsAndAnswers = new QuestionsAndAnswers(db);
  app.decorate('qna', questionsAndAnswers);
}

app
  .register(decorateFastifyInstance)
  .register(require('./qa'), { prefix: '/qa' })

app.listen(3000)
  .then((address: string) => console.log('listening on ', address))
  .catch((err: ErrorEvent) => {
    console.log('error starting server', err);
  });

// // this function exists to give the testing server instance the same
module.exports = function createTestInstance(testDB) {
  const instance = fastify();
  const questionsAndAnswers = new QuestionsAndAnswers(testDB);
  instance
    .decorate('qna', questionsAndAnswers)
    .register(decorateFastifyInstance)
    .register(require('./products'), { prefix: '/products' })
    .register(require('./qa'), { prefix: '/qa' });
  return instance;
};
