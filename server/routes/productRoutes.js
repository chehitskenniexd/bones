'use strict'

const epilogue = require('../epilogue')
const db = require('APP/db')

const customProductRoutes = require('express').Router()

// Custom routes go here.
const Product = db.model('product');
const Review = db.model('productReview');

// get all products and eager load everything
customProductRoutes.get('/', (req, res, next) => {
  Product.findAll({
    include: [
      { all: true }
    ]
  })
    .then(products => {
      products = products.sort((a, b) => a.id > b.id)
      res.status(200).json(products)
    })
    .catch(err => console.log('Error getting all products', err));
})

customProductRoutes.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(err => console.log('Error creating product!', err));
})

customProductRoutes.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, {
    include: [
      { model: Review }
    ]
  })
    .then(products => res.status(200).json(products))
    .catch(err => console.log('Error retrieving product', err));
})

customProductRoutes.get('/name/:name', (req, res, next) => {
  Product.findAll({
    where: {
      title: req.params.name
    }
  })
    .then(products => res.status(200).json(products))
    .catch(err => console.log('Error retrieving products by name', err));
})

module.exports = customProductRoutes

// Epilogue will automatically create standard RESTful routes
const product = epilogue.resource({
  model: db.model('product'),
  endpoints: ['/products', '/products/:id'],
  search: [
    // this sets up queries for the endpoints
    // i.e. /products?isDigitalShip=true
    {
      operator: '$eq',
      param: 'isDigitalShip',
      attributes: ['isDigitalShip']
    }, {
      param: 'productTitle',
      attributes: ['title']
    }, {
      param: 'productDesc',
      attributes: ['description']
    }, {
      operator: '$eq',
      param: 'category',
      attributes: ['category_id']
    }
  ],
  actions: [
    'delete'
  ]
})

// get details about one user
product.read = (req, res, context) => {
  const productId = req.params.id;
  aProduct = context.find(product => product.id === productId);
  res.status(201).json(aProduct);
}

const {mustBeLoggedIn, selfOnly, forbidden} = epilogue.filters
product.delete.auth(mustBeLoggedIn)
product.delete.auth(selfOnly)
//product.list.auth(forbidden)
//product.read.auth(mustBeLoggedIn)


//const customProductRoutes = require('express').
