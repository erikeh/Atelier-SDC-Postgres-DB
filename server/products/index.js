const {
  allProductsSchema,
  addProductSchema,
} = require('./schema');

// handlers
async function getOneProductHandler(req, reply) {
  try {
    const { id } = req.params;
    const product = await this.products.getOneProduct(id);
    reply.code(200).send(product);
  } catch (err) {
    reply.code(400).send(err);
    console.log(`error trying to get product: `, err);
  }
}

async function getAllProductsHandler(req, reply) {
  try {
    const products = await this.products.getAllProducts();
    reply.code(200).send(products);
  } catch (err) {
    reply.code(400).send(err);
    console.log('error trying to get all products: ', err);
  }
}

async function addProductsHandler(req, reply) {
  try {
    const productAdded = await this.products.addProduct(req.body);
    reply.code(200).send(productAdded);
  } catch (err) {
    reply.code(400).send(err);
    console.log('error trying to add product: ', err);
  }
}

async function getProductStylesHandler(req, reply) {
  try {
    const { id } = req.params;
    const styles = await this.products.getStyles(id);
    reply.code(200).send(styles);
  } catch (err) {
    reply.code(400).send(err);
    console.log('error trying to get styles: ', err);
  }
}

//routing
module.exports = function (fastify, opts, done) {
  fastify.get('/:id', getOneProductHandler);
  fastify.get('/', getAllProductsHandler);
  fastify.get('/:id/styles', getProductStylesHandler);
  fastify.post('/', { schema: addProductSchema }, addProductsHandler);
  done();
};

// { schema: allProductsSchema },