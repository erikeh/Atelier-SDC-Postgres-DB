const {
  postReviewOpts,
} = require('./schema');

// handlers

// get reviews by product id
async function getReviewsHandler(req, reply) {
  try {
    const { product_id, count = 5, page = 1 } = req.params;
    const reviewsData = await this.reviews.getReviewsById(product_id, count, page);
    reply.code(200).send(reviewsData);
  } catch (err) {
    reply.code(400).send(err);
    console.log('Error trying to get reviews:', err);
  }
}

// get reviews meta by product id
async function getReviewsMetaHandler(req, reply) {
  try {
    const { product_id } = req.params;
    const reviewsData = await this.reviews.getReviewsMeta(product_id);
    reply.code(200).send(reviewsData);
  } catch (err) {
    reply.code(400).send(err);
    console.log('Error trying to get reviews meta:', err);
  }
}

// post
async function postReviewHandler(req, reply) {
  try {
    await this.reviews.postReview(req.body);
    reply.code(201).send();
  } catch (err) {
    reply.code(400).send(err);
    console.log('Error trying to post review:', err);
  }
}

// update review as helpful
async function putHelpfulReviewHandler(req, reply) {
  try {
    const { review_id } = req.params;
    this.reviews.putHelpfulReview(review_id);
    reply.code(204).send();
  } catch (err) {
    reply.code(400).send(err);
    console.log('Error trying to update helpful review:', err);
  }
}

// update review to be reported
async function putReportReviewHandler(req, reply) {
  try {
    const { review_id } = req.params;
    this.reviews.putReportReview(review_id);
    reply.code(204).send();
  } catch (err) {
    reply.code(400).send(err);
    console.log('Error trying to update reported review:', err);
  }
}

// routing
module.exports = function reviewRoutes(fastify, options, done) {
  fastify.get('/:product_id', getReviewsHandler);
  fastify.get('/meta/:product_id', getReviewsMetaHandler);
  fastify.put('/:review_id/helpful', putHelpfulReviewHandler);
  fastify.put('/:review_id/report', putReportReviewHandler);
  fastify.post('/', postReviewHandler);
  done();
};
