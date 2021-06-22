const mongoose = require('mongoose')

const productSchema = new mongoose.Schema {
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  created_at: Date,
  updated_at: Date,
  features: [{
    feature: String,
    value: String
  }]
}

const reviewsSchema = new mongoose.Schema {
  id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  id_products: Number,
  photos: [{
    id: Number,
    url: String,
  }]
}

questionsSchema = new mongoose.Schema {
  body: String,
  date: Date,
  asker_name: String,
  question_helpfulness: Boolean,
  reported: Boolean,
  answers: [{
    body: String,
    date: Date,
    answerer_name: String,
    helpfulness: Boolean,
    photos: [ String ]
  }]
}
