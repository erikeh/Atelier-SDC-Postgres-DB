const getAllQuestionsOpts = {
  schema: {
    query: {
      type: 'object',
      required: ['product_id'],
      properties: {
        product_id: { type: 'number' },
        page: { type: 'number' },
        count: { type: 'number' },
      },
    },
  },
};

const getAllAnswersOpts = {
  schema: {
    params: {
      type: 'object',
      required: ['question_id'],
      properties: {
        product_id: { type: 'number' },
      },
    },
    query: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        count: { type: 'number' },
      },
    },
  },
};

const postQuestionOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['body', 'name', 'product_id'],
      properties: {
        body: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        product_id: { type: 'number' },
      },
    },
  },
};

const postAnswerOpts = {
  schema: {
    params: {
      type: 'object',
      required: ['question_id'],
      properties: {
        question_id: { type: 'number' },
      },
    },
    body: {
      type: 'object',
      required: ['body', 'name'],
      properties: {
        body: {type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        photos: { type: 'array' },
      },
    },
  },
};

const updateQuestionAsHelpfulOpts = {
  schema: {
    params: {
      type: 'object',
      required: ['question_id'],
      properties: {
        question_id: { type: 'number' },
      },
    },
  },
};

const reportQuestionOpts = {
  schema: {
    params: {
      type: 'object',
      required: ['question_id'],
      properties: {
        question_id: { type: 'number' },
      },
    },
  },
};

const updateAnswerAsHelpfulOpts = {
  schema: {
    params: {
      type: 'object',
      required: ['answer_id'],
      properties: {
        answer_id: { type: 'number' },
      },
    },
  },
};

const reportAnswerOpts = {
  schema: {
    params: {
      type: 'object',
      required: ['answer_id'],
      properties: {
        answer_id: { type: 'number' },
      },
    },
  },
};

module.exports = {
  getAllQuestionsOpts,
  getAllAnswersOpts,
  postQuestionOpts,
  postAnswerOpts,
  updateQuestionAsHelpfulOpts,
  reportQuestionOpts,
  updateAnswerAsHelpfulOpts,
  reportAnswerOpts,
};
