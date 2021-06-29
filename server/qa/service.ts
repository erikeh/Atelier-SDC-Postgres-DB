import { Knex } from 'knex';

function convertCSVDate(collection: Array<any>, dateName: string) {
  collection.forEach((entry) => {
    const formattedDate = new Date(Number(entry[dateName]));
    // eslint-disable-next-line no-param-reassign
    entry[dateName] = formattedDate.toString();
  });
}
module.exports = class Questions {
  db: Knex

  constructor(db) {
    this.db = db;
  }

  async getAllQuestions(product_id: number, page: number, count: number) {
    const knex = this.db;

    const allQuestions = await knex('questions')
      .select('question_id', 'question_body', 'question_date', 'asker_name', 'asker_email', 'question_helpfulness', 'reported')
      .where({ id_products: product_id })
      .limit(count)
      .offset(count * page - count);
    convertCSVDate(allQuestions, 'question_date');

    const findAnswersForQuestions = allQuestions.map(async (question) => {
      const relatedAnswers = await knex('answers')
        .leftJoin('answers_photos', 'answers_photos.answer_id', 'answers.answer_id')
        .where({ id_questions: question.question_id })
        .select(['answers.answer_id as id', 'answers.body', 'answers.date', 'answers.answerer_name', 'answers.helpfulness', knex.raw('ARRAY_AGG(answers_photos.url) as photos')])
        .groupBy('answers.answer_id');
      convertCSVDate(relatedAnswers, 'date');

      // formatting here to adhere to atelier's nested API data structure
      const formatted = relatedAnswers.reduce((acc, answer: any) => (
        { ...acc, [answer.id]: answer }
      ), {});
      return { ...question, answers: formatted };
    });

    async function questionsAndAnswersResultsWrapper() {
      const resolvedQuestionsAndAnswers = await Promise.all(findAnswersForQuestions);
      const resultsWrapper = {
        product_id,
        results: resolvedQuestionsAndAnswers,
      };
      return resultsWrapper;
    }

    const wrappedQuestionsAndAnswers = questionsAndAnswersResultsWrapper();
    return wrappedQuestionsAndAnswers;
  }

  async getAllAnswers(question_id: number, page: number, count: number) {
    const knex = this.db;
    const allAnswers = await knex('answers')
      .leftJoin('answers_photos', 'answers_photos.answer_id', 'answers.answer_id')
      .where({ id_questions: question_id })
      .select([
        'answers.answer_id', 'answers.body', 'answers.date', 'answers.answerer_name', 'answers.answerer_email', 'answers.reported', 'answers.helpfulness', knex.raw('ARRAY_AGG(answers_photos.url) as photos'),
      ])
      .groupBy('answers.answer_id')
      .limit(count)
      .offset(count * page - count);

    function answersResultsWrapper() {
      const wrappedResult = {
        question: question_id,
        page,
        count,
        results: allAnswers,
      };
      return wrappedResult;
    }

    const wrappedAnswers = answersResultsWrapper();
    return wrappedAnswers;
  }

  async postQuestion(body: string, name: string, email: string, product_id: number) {
    const knex = this.db;
    await knex('questions')
      .insert({
        question_body: body,
        asker_name: name,
        asker_email: email,
        id_products: product_id,
      });
  }

  async postAnswer(body: string, name: string, email: string, photos: any, question_id: number) {
    const knex = this.db;
    const insertedAnswerId = await knex('answers')
      .insert({
        id_questions: question_id,
        body,
        answerer_name: name,
        answerer_email: email,
      }, 'answer_id');
    await knex('answers_photos')
      .where({ answer_id: insertedAnswerId[0] })
      .update({ url: photos });
  }

  async updateQuestionAsHelpful(question_id) {
    const knex = this.db;
    await knex('questions')
      .where({ question_id })
      .increment('question_helpfulness', 1);
  }

  async reportQuestion(question_id) {
    const knex = this.db;
    await knex('questions')
      .where({ question_id })
      .update({ reported: true });
  }

  async updateAnswerAsHelpful(answer_id) {
    const knex = this.db;
    await knex('answers')
      .where({ answer_id })
      .increment('helpfulness');
  }

  async reportAnswer(answer_id) {
    const knex = this.db;
    await knex('answers')
      .where({ answer_id })
      .update({ reported: true });
  }
};
