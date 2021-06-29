module.exports = class Reviews {
  constructor(db) {
    this.db = db;
  }

  async getReviewsById(id, count, page) {
    const offSet = count * page - count;
    const data = {};
    const reviews = await this.db.raw(`select reviews.id AS review_id, rating, summary,recommend, response, body, to_timestamp(date/1000) AS date, reviewer_name, helpfulness from reviews where product_id = ${id} AND reviews.reported = false LIMIT ${count} OFFSET ${offSet};`);

    const reviewsWithPhotos = reviews.rows.map(async (review) => {
      const photos = await this.db.raw(`select id, url from review_photos where review_photos.review_id = ${review.review_id};`);
      return { ...review, photos: photos.rows };
    });
    data.product = id;
    data.page = page;
    data.count = reviews.rowCount;
    data.results = await Promise.all(reviewsWithPhotos);
    return data;
  }

  async getReviewsMeta(id) {
    const data = {};
    data.product_id = `${id}`;
    data.recommended = {
      true: 0,
      false: 0,
    };
    data.ratings = {};
    data.Characteristics = {};

    const reviewMeta = await this.db.raw(`select id, product_id, rating, recommend from reviews where product_id = ${id} AND reviews.reported = false;`);
    // Counting number of recommends
    reviewMeta.rows.forEach((entry) => {
      if (entry.recommend) {
        data.recommended.true += 1;
      } else {
        data.recommended.false += 1;
      }
    });
    // Counting number of ratings per review
    reviewMeta.rows.forEach((entry) => {
      if (!data.ratings[entry.rating]) {
        data.ratings[entry.rating] = 1;
      } else {
        data.ratings[entry.rating] += 1;
      }
    });
    // Characteristic data
    const characterData = await this.db.raw(`select name, characteristic_reviews.character_id, AVG(value)::numeric(10,4) from characteristics LEFT JOIN characteristic_reviews ON characteristic_reviews.character_id = characteristics.id where product_id = ${id} GROUP BY name,characteristic_reviews.character_id;`);
    characterData.rows.forEach((entry) => {
      data.Characteristics[entry.name] = {
        id: entry.character_id,
        value: entry.avg,
      };
    });
    return data;
  }

  async putHelpfulReview(id) {
    const update = await this.db.raw(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${id} `);
    return update;
  }

  async putReportReview(id) {
    const update = await this.db.raw(`UPDATE reviews SET reported = true WHERE id = ${id};`);
    return update;
  }

  async postReview(params) {
    try {
      const {
        product_id,
        rating,
        summary,
        body,
        recommend,
        name,
        email,
        photos,
        characteristics,
      } = params;

      const date = Date.now();
      const knex = this.db;

      await knex.transaction(async (trx) => {
        const insertedId = await knex('reviews')
          .insert({
            product_id,
            rating,
            date,
            summary,
            body,
            recommend,
            reviewer_name: name,
            reviewer_email: email,
          }, 'id')
          .transacting(trx);

        // For Photos
        const photosArry = [];
        if (photos.length !== 0) {
          photos.forEach((entry) => {
            const photoObj = {
              review_id: insertedId[0],
              url: entry,
            };
            photosArry.push(photoObj);
          });
          await knex('review_photos')
            .insert(photosArry)
            .transacting(trx);
        }

        // For characertistics
        const characertisticsArray = [];
        Object.entries(characteristics).forEach(async (entry) => {
          const [key, value] = entry;
          const characterObj = {
            character_id: parseInt(key, 10),
            review_id: insertedId[0],
            value,
          };
          characertisticsArray.push(characterObj);
        });
        await trx('characteristic_reviews')
          .insert(characertisticsArray)
          .transacting(trx);
      });
    } catch (error) {
      console.log('Error Posting Review', error);
      throw error;
    }
  }
};
