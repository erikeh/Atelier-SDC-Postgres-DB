module.exports = class Products {
  constructor(db) {
    this.db = db;
  }

  async getAllProducts() {
    const products = await this.db.select().from('products').whereBetween('id', [1, 50]);
    return products;
  }

  async getOneProduct(id) {
    let product = await this.db.select().from('products').where({ 'products.id': `${id}` });
    const styles = await this.db.select('feature', 'value').from('features').where({ product_id: `${id}` });
    [product] = product;
    product.features = styles;
    return product;
  }

  // async addProduct(productInfo) {
  //   const { id, name, slogan, description, category, default_price } = productInfo.body;
  // const productAdded = await this.db.insert(productInfo);
  // return productAdded;
  // }

  async getStyles(id) {
    const results = await this.db.select().from('products').where({ 'products.id': `${id}` });
    const photos = await this.db.select('url', 'thumbnail_url').from('photos', { 'products.id': 'photos.styleid' }).where({ 'photos.styleid': `${id}` });
    results.photos = photos;
    const skus = await this.db.select('quantity', 'size').from('skus').where({ styleid: `${id}` });
    const styles = {
      product_id: `${id}`,
      results,
      skus,
    };

    return styles;
  }
};
