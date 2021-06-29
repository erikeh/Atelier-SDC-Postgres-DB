import { FastifyReply, FastifyRequest } from "fastify";

async function getAllQuestionsHandler(req: any, reply: FastifyReply) {
  try {
    const { product_id, page = 1, count = 5 } = req.query;
    const allQuestions: Array<object> = await this.qna.getAllQuestions(product_id, page, count);
    reply.code(200).send(allQuestions);
  } catch (err) {
    console.log('error trying to get all q & a from method: ', err);
    throw err;
  }
}

async function getAllAnswersHandler(req: any, reply: FastifyReply) {
  try {
    const { question_id } = req.params;
    const { page = 1, count = 5 } = req.query;
    const allAnswers: Array<object> = await this.qna.getAllAnswers(question_id, page, count);
    reply.code(200).send(allAnswers);
  } catch (err) {
    console.log('error trying to get one question: ', err);
    throw err;
  }
}

async function postQuestionHandler(req: any, reply: FastifyReply) {
  try {
    const {
      body, name, email, product_id,
    } = req.body;
    await this.qna.postQuestion(body, name, email, product_id);
    reply.code(201).send('CREATED new question');
  } catch (err) {
    console.log('error trying to post question: ', err);
    throw err;
  }
}

async function postAnswerHandler(req: any, reply: FastifyReply) {
  try {
    const { question_id } = req.params;
    const {
      body, name, email, photos,
    } = req.body;
    await this.qna.postAnswer(body, name, email, photos, question_id);
    reply.code(201).send('CREATED new answer');
  } catch (err) {
    console.log('error trying to post answer: ', err);
    throw err;
  }
}

async function updateQuestionAsHelpfulHandler(req: any, reply: FastifyReply) {
  try {
    const { question_id } = req.params;
    await this.qna.updateQuestionAsHelpful(question_id);
    reply.code(201).send('sucessfully updated question as helpful');
  } catch (err) {
    console.log('error trying to mark question as helpful', err);
    throw err;
  }
}

async function reportQuestionHandler(req: any, reply: FastifyReply) {
  try {
    const { question_id } = req.params;
    await this.qna.reportQuestion(question_id);
    reply.code(201).send('successfully reported question');
  } catch (err) {
    console.log('error trying to report question');
    throw err;
  }
}

async function updateAnswerAsHelpfulHandler(req: any, reply: FastifyReply) {
  try {
    const { answer_id } = req.params;
    await this.qna.updateAnswerAsHelpful(answer_id);
    reply.code(201).send('successfully marked answer as helpful');
  } catch (err) {
    console.log('error trying to mark answer as helpful');
    throw err;
  }
}

async function reportAnswerHandler(req: any, reply: FastifyReply) {
  try {
    const { answer_id } = req.params;
    await this.qna.reportAnswer(answer_id);
    reply.code(201).send('successfully reported answer');
  } catch (err) {
    console.log('error trying to report answer');
    throw err;
  }
}

module.exports = {
  getAllQuestionsHandler,
  getAllAnswersHandler,
  postQuestionHandler,
  postAnswerHandler,
  updateQuestionAsHelpfulHandler,
  reportQuestionHandler,
  updateAnswerAsHelpfulHandler,
  reportAnswerHandler,
}