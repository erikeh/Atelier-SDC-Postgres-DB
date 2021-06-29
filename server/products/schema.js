module.exports = {

  addProductSchema: {
    body: {
      type: 'object',
      required: ['name', 'slogan', 'description', 'category', 'default_price'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        slogan: { type: 'string' },
        description: { type: 'string' },
        category: { type: 'string' },
        default_price: { type: 'number' },
      },
    },
  },

  allProductsSchema: {
    type: 'array',
  },

};
