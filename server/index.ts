import { FastifyRegister } from "fastify";
import { Knex } from 'knex';

const fastify = require('fastify')({
  logger: true,
  prettyPrint: true,
});
const fp: FastifyRegister = require('fastify-plugin');
const db: Knex = require('./db/');
// model classes
const QuestionsAndAnswers = require('./qa/service');

async function decorateFastifyInstance(): Promise<void> {
  const questionsAndAnswers = new QuestionsAndAnswers(db);
  fastify.decorate('qna', questionsAndAnswers);
}

function registerInstance() {
  fastify
    .register(fp(decorateFastifyInstance))
    .register(require('./products'), { prefix: '/products' })
    .register(require('./qa'), { prefix: '/qa' });
}

registerInstance();

fastify.listen(3000)
  .then((address: string) => console.log('listening on ', address))
  .catch((err: ErrorEvent) => {
    console.log('error starting server', err);
    process.exit(1);
  });

module.exports = registerInstance;
