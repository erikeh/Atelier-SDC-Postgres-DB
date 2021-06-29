const postReviewOpts = {
  schema: {
    params: {
      type: 'object',
      required: ['product_id'],
      properties: {
        product_id: { type: 'number' },
      },
    },
  },
};

module.exports = {
  postReviewOpts,
};
