import { FastifyInstance, FastifyReply } from "fastify";

const {
  getAllQuestionsOpts,
  getAllAnswersOpts,
  postQuestionOpts,
  postAnswerOpts,
  updateQuestionAsHelpfulOpts,
  reportQuestionOpts,
  updateAnswerAsHelpfulOpts,
  reportAnswerOpts,
} = require('./schema');

const {
  getAllQuestionsHandler,
  getAllAnswersHandler,
  postQuestionHandler,
  postAnswerHandler,
  updateQuestionAsHelpfulHandler,
  reportQuestionHandler,
  updateAnswerAsHelpfulHandler,
  reportAnswerHandler,
} = require('./handlers');


module.exports = function (fastify: FastifyInstance, opts, done: Function): void {
  fastify.get('/questions/', getAllQuestionsOpts, getAllQuestionsHandler);
  fastify.get('/questions/:question_id/answers', getAllAnswersOpts, getAllAnswersHandler);
  fastify.post('/questions', postQuestionOpts, postQuestionHandler);
  fastify.post('/questions/:question_id/answers', postAnswerOpts, postAnswerHandler);
  fastify.put('/questions/:question_id/helpful', updateQuestionAsHelpfulOpts, updateQuestionAsHelpfulHandler);
  fastify.put('/questions/:question_id/report', reportQuestionOpts, reportQuestionHandler);
  fastify.put('/answers/:answer_id/helpful', updateAnswerAsHelpfulOpts, updateAnswerAsHelpfulHandler);
  fastify.put('/answers/:answer_id/report', reportAnswerOpts, reportAnswerHandler);
  done();
};
