// import express from "express";
const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const ProductController = require('../controllers/product');

router.get('/',authMiddleware,ProductController.getAllProducts);
router.route('/add')
.get(authMiddleware,(req,res)=>{
    res.render('products/create')
})
.post(ProductController.addProduct)
router.route('/:id/edit')
.get(authMiddleware,ProductController.showEdit)
router.route('/:id')
.post(ProductController.Edit)
.delete(ProductController.Delete)
router.route('/:id/detail')
.get(ProductController.Detail)
router.route('/categories/:CatID/products')
.get(ProductController.getProductsByCategory);
module.exports = router;